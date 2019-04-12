import rules from "../helpers/validationRules";
import validationErrors from "../helpers/validationErrors";
import ValidationHelper from "../helpers/validationHelper";
import database from "../models/database";


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

		const accountErrors = ValidationHelper.validateAccount(owner, type);

		let errors = {};

		errors = Object.assign(errors, accountErrors);
		ValidationHelper.checkValidationErrors(response, errors, next);
	}


	/**
   * check if user already has an account
   * @param {String} ID
   * @return {object}
   */
	static checkDuplicateAccount(request, response, next) {
   		const users = database.findAll("account");
   		const findUser = users.filter(value => {
   			return value.owner == request.body.owner;
   		});
   		if(findUser.length > 0) {
   			return response.status(406)
				.json({
					status: 406,
					error: validationErrors.accountExists,
				});
   		}
   		 return next();
	}
}

export default ValidateAccount;