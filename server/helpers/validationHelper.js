import rules from "./validationRules";
import validationErrors from "./validationErrors";

/**
 *    @fileOverview Class to hold general validation methods
 *    @class ValidationHelper
 *    @exports ValidationHelper
 */

class ValidateHelper {
	/**
   * validate user email and name
   * @param {String} name
   * @param {String} email
   * @return {Object} errors
   */
	static validateUser(email, firstName, lastName, isSignup) {
		const errors = {};

		if (!firstName || !rules.empty.test(firstName)) {
			errors.fnameRequired = validationErrors.fnameRequired;
		}
		if (!rules.nameLength.test(firstName)) errors.fnameLength = validationErrors.fnameLength;
		if (!rules.validName.test(firstName)) errors.validFName = validationErrors.validFName;

		if (!lastName || !rules.empty.test(lastName)) {
			errors.lnameRequired = validationErrors.lnameRequired;
		}
		if (!rules.nameLength.test(lastName)) errors.lnameLength = validationErrors.lnameLength;
		if (!rules.validName.test(lastName)) errors.validLName = validationErrors.validLName;

		if ((!email || !rules.empty.test(email)) && isSignup) errors.emailRequired = validationErrors.emailRequired;
		if (!rules.validEmail.test(email)) errors.validEmail = validationErrors.validEmail;
		return errors;
	}

	/**
   * validate account
   * @param {String} owner
   * @param {String} type
   * @return {Object} errors
   */

	static validateAccount(owner, type) {
		const errors = {};
		if (!owner || !rules.empty.test(owner)) errors.ownerRequired = validationErrors.ownerRequired;
		if (!rules.validInt.test(owner)) errors.ownerId = validationErrors.ownerId;

		if (!type || !rules.empty.test(type)) errors.accountTypeRequired = validationErrors.accountTypeRequired;
		if (!rules.accountType.test(type)) errors.validType = validationErrors.validType;
		
		return errors;
	}

	/**
   * validate account status
   * @param {String} status
   * @return {Object} errors
   */
	static validateUpdateAccountStatus(status) {
		const errors = {};
		if (!status || !rules.empty.test(status)) errors.statusRequired = validationErrors.statusRequired;
		if (!rules.accountStatus.test(status)) errors.validStatus = validationErrors.validStatus;
		
		return errors;
	}

	/**
   * check if id is valid
   * @param {Object} request
   * @return {boolean} true
   */
	  static checkValidAccountNumber(number) {

	    if (rules.validInt.test(number)) {
	    	if(number.length == 10) {
	    		 return true;
	    	}
	    }
	    return false;
	  }

	  	/**
   * validate cashier, amount, type
   * @param {String} name
   * @param {String} email
   * @return {Object} errors
   */
	static validateDebitAccount(cashier, amount, type) {
		const errors = {};

		if (!cashier || !rules.empty.test(cashier)) {
			errors.cashierRequired = validationErrors.cashierRequired;
		}
		if(!rules.validInt.test(cashier)) errors.cashierId = validationErrors.cashierId;

		if (!amount || !rules.empty.test(amount)) {
			errors.amountRequired = validationErrors.amountRequired;
		}
		if(!rules.validAmount.test(amount)) errors.validAmount = validationErrors.validAmount;
		
		if (!type || !rules.empty.test(type)) errors.debitTypeRequired = validationErrors.debitTypeRequired;
		
		if(type !== 'debit') errors.debitTypeRequired = validationErrors.debitTypeRequired;
		
		return errors;
	}

		/**
   * validate cashier, amount, type
   * @param {String} name
   * @param {String} email
   * @return {Object} errors
   */
	static validateCreditAccount(cashier, amount, type) {
		const errors = {};

		if (!cashier || !rules.empty.test(cashier)) {
			errors.cashierRequired = validationErrors.cashierRequired;
		}
		if(!rules.validInt.test(cashier)) errors.cashierId = validationErrors.cashierId;

		if (!amount || !rules.empty.test(amount)) {
			errors.amountRequired = validationErrors.amountRequired;
		}
		if(!rules.validAmount.test(amount)) errors.validAmount = validationErrors.validAmount;

		if (!type || !rules.empty.test(type)) errors.creditTypeRequired = validationErrors.creditTypeRequired;
		
		if(type !== 'credit') errors.creditTypeRequired = validationErrors.creditTypeRequired;
		return errors;
		
	}

	/**
   * check if data validation produces any errors
   * @param {Object} request
   * @return {boolean} false
   */
	static checkValidationErrors(response, errors, next) {
		if (Object.keys(errors).length > 0) {
			return response.status(406).json({
				status: 406,
				error: errors,
			});
		}
		return next();
	}

	

}
export default ValidateHelper;