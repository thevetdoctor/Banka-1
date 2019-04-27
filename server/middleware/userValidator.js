import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import config from '../config/config';
import db from '../helpers/query';
import rules from '../helpers/validationRules';
import validationErrors from '../helpers/validationErrors';
import ValidationHelper from '../helpers/validationHelper';

dotenv.config();
const { secretKey } = config;

class ValidateUser {
  /**
   * validate signup input
   * @param {Object} request
   * @param {Object} response
   * @callback {Function} next
   * @return {String} errors
   */

  static validateSignup(request, response, next) {
    const {
      email,
      firstName,
      lastName,
      password,
      type
    } = request.body;

    let errors = {};
    const userErrors = ValidationHelper.validateUser({
      Email: email, Firstname: firstName, Lastname: lastName, Password: password
    });

    try {
      const userToken = request.headers['x-access'] || request.headers.token;
      if (userToken) {
        const verifiedToken = jwt.verify(userToken, secretKey);
        request.token = verifiedToken;
        if (verifiedToken.user.isadmin) {
          if (!type || !rules.empty.test(type)) {
            errors.userTypeRequired = validationErrors.userTypeRequired;
          }
          if (Object.keys(errors).length === 0) {
            if (!rules.userType.test(type)) errors.validUserType = validationErrors.validUserType;
          }
        }
      } else if (type) {
        if (Object.keys(errors).length === 0) {
          if (type !== 'client') errors.validUserType = validationErrors.validUserType;
        }
      }
    } catch (error) {
      return response.status(401).json({
        status: 401,
        error: validationErrors.notAuthenticated,
      });
    }

    errors = Object.assign(errors, userErrors);
    ValidationHelper.checkValidationErrors(response, errors, next);
  }


  /**
   * check if user M already exists
   * @param {String} email
   * @return {object}
   */
  static checkDuplicateEmail(request, response, next) {
    const query = `SELECT email FROM users WHERE email ='${request.body.email}'`;
    db.dbQuery(query)
      .then((dbResult) => {
        if (dbResult.rows[0]) {
          return response.status(400)
            .json({
              status: 400,
              error: validationErrors.emailExists,
            });
        }
        return next();
      }).catch();
  }

  /**
   * validate user signin input length and content
   * @param {Object} request
   * @param {Object} response
   *
   * @callback {Function} next
   *
   * @return {Object} json
   */
  static validateSignin(request, response, next) {
    const {
      email,
      password,
    } = request.body;

    if (email && password) {
      const errors = {};

      if (!rules.validEmail.test(email.trim())) errors.email = [validationErrors.validEmail];
      Object.keys(errors).forEach(key => (errors[key].length === 0 ? delete errors[key] : ''));
      if (Object.keys(errors).length > 0) {
        return response.status(400).json({
          status: 400,
          error: errors,
        });
      }
      return next();
    }
    return ValidateUser.loginRequiredResponse(response);
  }

  static loginRequiredResponse(response) {
    return response.status(400).json({
      status: 400,
      error: validationErrors.loginRequired,
    });
  }
}
export default ValidateUser;
