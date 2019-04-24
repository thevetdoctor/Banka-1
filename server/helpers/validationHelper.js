import rules from './validationRules';
import validationErrors from './validationErrors';

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
    let errors = {};

    if (!firstName || !rules.empty.test(firstName.trim())) {
      errors.fnameRequired = validationErrors.fnameRequired;
    }


    if (!lastName || !rules.empty.test(lastName.trim())) {
      errors.lnameRequired = validationErrors.lnameRequired;
    }


    if ((!email || !rules.empty.test(email.trim())) && isSignup) errors.emailRequired = validationErrors.emailRequired;

    if (Object.keys(errors).length == 0) {
      if (!rules.validName.test(firstName)) errors.validFName = validationErrors.validFName;
      if (!rules.validName.test(lastName)) errors.validLName = validationErrors.validLName;
      if (!rules.nameLength.test(firstName)) errors.fnameLength = validationErrors.fnameLength;
      if (!rules.nameLength.test(lastName)) errors.lnameLength = validationErrors.lnameLength;
      if (!rules.validEmail.test(email)) errors.validEmail = validationErrors.validEmail;

      errors = ValidateHelper.getFirstError(errors);
    }

    return errors;
  }

  /**
   * validate account
   * @param {String} owner
   * @param {String} type
   * @return {Object} errors
   */

  static validateAccount(type) {
    let errors = {};

    if (!type || !rules.empty.test(type.trim())) errors.accountTypeRequired = validationErrors.accountTypeRequired;
    if (Object.keys(errors).length == 0) {
      if (!rules.accountType.test(type.trim())) errors.validType = validationErrors.validType;
      errors = ValidateHelper.getFirstError(errors);
    }


    return errors;
  }

  /**
   * validate account status
   * @param {String} status
   * @return {Object} errors
   */
  static validateUpdateAccountStatus(status) {
    let errors = {};
    if (!status || !rules.empty.test(status.trim())) errors.statusRequired = validationErrors.statusRequired;

    if (Object.keys(errors).length == 0) {
      if (!rules.accountStatus.test(status.trim())) errors.validStatus = validationErrors.validStatus;
      errors = ValidateHelper.getFirstError(errors);
    }

    return errors;
  }

  /**
   * check if id is valid
   * @param {Object} request
   * @return {boolean} true
   */
	  static checkValidAccountNumber(number) {
	    if (rules.validInt.test(number)) {
	    	if (number.length == 10) {
	    		 return true;
	    	}
	    }
	    return false;
	  }

	  /**
   * check if id is valid
   * @param {Object} request
   * @return {boolean} true
   */
	  static checkValidId(number) {
	    if (rules.validInt.test(number)) {
	    		 return true;
	    }
	    return false;
	  }

	    /**
   * check if email is valid
   * @param {Object} request
   * @return {boolean} true
   */
	  static checkValidEmail(email) {
	    if (rules.validEmail.test(email.trim())) {
	    		 return true;
	    }
	    return false;
	  }

	  	/**
   * validate cashier, amount, type
   * @param {String} name
   * @param {String} email
   * @return {Object} errors
   */
  static validateDebitAccount(amount, type) {
    let errors = {};

    if (!amount || !rules.empty.test(amount)) {
      errors.amountRequired = validationErrors.amountRequired;
    }


    if (!type || !rules.empty.test(type.trim())) errors.debitTypeRequired = validationErrors.debitTypeRequired;

    if (Object.keys(errors).length == 0) {
      if (!rules.validAmount.test(amount)) errors.validAmount = validationErrors.validAmount;
      if (type !== 'debit') errors.debitTypeRequired = validationErrors.debitTypeRequired;
      errors = ValidateHelper.getFirstError(errors);
    }
    return errors;
  }

  /**
   * validate cashier, amount, type
   * @param {String} name
   * @param {String} email
   * @return {Object} errors
   */
  static validateCreditAccount(amount, type) {
    let errors = {};

    if (!amount || !rules.empty.test(amount)) {
      errors.amountRequired = validationErrors.amountRequired;
    }

    if (Object.keys(errors).length == 0) {
      if (!rules.validAmount.test(amount)) errors.validAmount = validationErrors.validAmount;
      if (!type || !rules.empty.test(type.trim())) errors.creditTypeRequired = validationErrors.creditTypeRequired;

      if (type !== 'credit') errors.creditTypeRequired = validationErrors.creditTypeRequired;
      errors = ValidateHelper.getFirstError(errors);
    }
    return errors;
  }

  /**
   * check if data validation produces any errors
   * @param {Object} request
   * @return {boolean} false
   */
  static checkValidationErrors(response, errors, next) {
    if (Object.keys(errors).length > 0) {
      return response.status(400).json({
        status: 400,
        error: errors,
      });
    }
    return next();
  }

  static getFirstError(errors) {
    const firstKey = Object.keys(errors)[0];

		 const error = Object.keys(errors)
      .filter(key => key == firstKey)
      .reduce((obj, key) => {
        obj[key] = errors[key];
        return obj;
      }, {});

    return error;
  }
}
export default ValidateHelper;
