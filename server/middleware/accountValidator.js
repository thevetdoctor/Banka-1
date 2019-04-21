import db from '../helpers/query';
import dotenv from 'dotenv';
import config from '../config/config';
import rules from "../helpers/validationRules";
import validationErrors from "../helpers/validationErrors";
import ValidationHelper from "../helpers/validationHelper";
import jwt from 'jsonwebtoken';

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
			owner,
			type,
		} = request.body;

		const accountErrors = ValidationHelper.validateAccount(type.trim());

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
	    const accountStatusError = ValidationHelper.validateUpdateAccountStatus(status.trim());

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
      .then(dbResult => {
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
		const accountNumber = request.params.accountNumber;

		  if (!ValidationHelper.checkValidAccountNumber(accountNumber)) {
	      		return response.status(400)
				            .json({
				              status: 400,
				              error: validationErrors.validAccountNumber,
				   });
	    	}

	    	 const query = `SELECT * FROM accounts WHERE accountnumber ='${accountNumber}'`;
		     db.dbQuery(query)
		      .then(dbResult => {
		        if (dbResult.rowCount == 0) {
		          return response.status(400)
		            .json({
		              status: 400,
		              error: validationErrors.noAccountNumber,
		            });
		        } 
		       })	
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
}

export default ValidateAccount;