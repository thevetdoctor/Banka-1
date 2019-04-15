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

   static validateDebitAccount(request, response, next) {
		const {
			cashier,
			amount,
			type
		} = request.body;

		const debitAccountErrors = ValidationHelper.validateDebitAccount(cashier, amount, type);

		let errors = {};

		errors = Object.assign(errors, debitAccountErrors);
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
	    const accountStatusError = ValidationHelper.validateUpdateAccountStatus(status);

	     errors = Object.assign(errors, accountStatusError);
	     
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

	/**
   * check if an account balance is not less than amount
   * @return {object}
   */
	static checkAmount(request, response, next) {
   		const transaction = database.findAll("transaction");
   		lastTransaction = transaction[transaction - 1]
   		if(lastTransaction.balance < request.body.amount) {
   			return response.status(406)
				.json({
					status: 406,
					error: validationErrors.insufficientFund,
				});
   		}
   		 return next();
	}


}

export default ValidateAccount;