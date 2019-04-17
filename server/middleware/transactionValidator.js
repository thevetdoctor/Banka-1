import rules from "../helpers/validationRules";
import validationErrors from "../helpers/validationErrors";
import ValidationHelper from "../helpers/validationHelper";
import database from "../models/database";


class ValidateTransaction {
	/**
   * validate Debit Account input
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
   * validate Credit Account input
   * @param {Object} request
   * @param {Object} response
   * @callback {Function} next
   * @return {String} errors
   */

   static validateCreditAccount(request, response, next) {
		const {
			cashier,
			amount,
			type
		} = request.body;

		const debitAccountErrors = ValidationHelper.validateCreditAccount(cashier, amount, type);

		let errors = {};

		errors = Object.assign(errors, debitAccountErrors);
		ValidationHelper.checkValidationErrors(response, errors, next);
	}


	/**
   * check if an account balance is not less than amount
   * @return {object}
   */
	static checkAmount(request, response, next) {
   		let transaction = database.findAll("transaction");
   		
   		if(!transaction.length) {
   			ValidateTransaction.insufficientFundResponse(response)
   		}
   		let lastTransaction = transaction[transaction.length - 1]

   		if(lastTransaction) {
   			if(parseFloat(lastTransaction.balance) < request.body.amount) {
   				ValidateTransaction.insufficientFundResponse(response)
   		}
   		}
   		
   		   	return next();	
   				
	}

	 static insufficientFundResponse(response) {
    return response.status(406).json({
      status: 406,
      error: validationErrors.insufficientFund,
    });
  }

}

export default ValidateTransaction;