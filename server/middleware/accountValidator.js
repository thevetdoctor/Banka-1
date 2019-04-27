import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../helpers/query';
import config from '../config/config';
import validationErrors from '../helpers/validationErrors';
import ValidationHelper from '../helpers/validationHelper';

dotenv.config();
const { secretKey } = config;


class ValidateAccount {
  /**
   * validate createAccount input
   * @param {Object} request
   * @param {Object} response
   * @callback {Function} next
   * @return {String} errors
   */

  static validateCreateAccount(request, response, next) {
    const {
      type,
    } = request.body;

    const accountErrors = ValidationHelper.validateAccount({ Type: type });

    let errors = {};

    errors = Object.assign(errors, accountErrors);
    ValidationHelper.checkValidationErrors(response, errors, next);
  }

  /**
   * validate updateAccountStatus input
   * @param {Object} request
   * @param {Object} response
   * @callback {Function} next
   * @return {String} errors
   */
  static validateAccountStatus(request, response, next) {
    let errors = {};
    const { status } = request.body;
    const accountStatusError = ValidationHelper.validateUpdateAccountStatus({ Status: status });
    errors = Object.assign(errors, accountStatusError);
    ValidationHelper.checkValidationErrors(response, errors, next);
  }


  /**
   * check if user already has an account
   * @param {String} ID
   * @return {object}
   */

  static checkDuplicateAccount(request, response, next) {
    const { type } = request.body;
    const token = request.headers['x-access'] || request.headers.token || request.query.token;
    const verifiedToken = jwt.verify(token, secretKey);
    const query = `SELECT owner FROM accounts WHERE owner ='${verifiedToken.user.id}' AND type = '${type}'`;
    db.dbQuery(query)
      .then((dbResult) => {
        if (dbResult.rows[0]) {
          return response.status(400)
            .json({
              status: 400,
              error: validationErrors.accountExists,
            });
        }
        return next();
      }).catch();
  }


  static validateAccountNumber(request, response, next) {
    const { accountNumber } = request.params;
    if (!ValidationHelper.checkValidAccountNumber(accountNumber)) {
      return response.status(400)
        .json({
          status: 400,
          error: validationErrors.validAccountNumber,
        });
    }
    const query = `SELECT * FROM accounts WHERE accountnumber ='${accountNumber}'`;
    db.dbQuery(query)
      .then((dbResult) => {
        if (dbResult.rowCount === 0) {
          return response.status(400)
            .json({
              status: 400,
              error: validationErrors.noAccountNumber,
            });
        }
      });
    return next();
  }

  static validateId(request, response, next) {
    const { id } = request.params;
    if (!ValidationHelper.checkValidId(id)) {
      return response.status(400)
        .json({
          status: 400,
          error: validationErrors.validId,
        });
    }
    return next();
  }

  static validateEmail(request, response, next) {
    const { email } = request.params;
    if (!ValidationHelper.checkValidEmail(email)) {
      return response.status(400)
        .json({
          status: 400,
          error: validationErrors.validEmail,
        });
    }
    return next();
  }
}

export default ValidateAccount;
