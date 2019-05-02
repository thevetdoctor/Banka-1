import rules from './validationRules';
import validationErrors from './validationErrors';

/**
 *    @fileOverview Class to hold general validation methods
 *    @class ValidationHelper
 *    @exports ValidationHelper
 */

class ValidateHelper {
  /**
   *  * validate user email and name
   * * @param {String} name
   *  * @param {String} email
   *  * @return {Object} errors
   *  */
  static validateUser(obj) {
    const errors = ValidateHelper.errorsArr(obj);

    if (!obj.Firstname || !rules.empty.test(obj.Firstname.trim())) {
      errors.Firstname.push(validationErrors.fnameRequired);
    }


    if (!obj.Lastname || !rules.empty.test(obj.Lastname.trim())) {
      errors.Lastname.push(validationErrors.lnameRequired);
    }
    if (!obj.Password || !rules.empty.test(obj.Password.trim())) {
      errors.Password.push(validationErrors.passwordEmpty);
    }

    if (!obj.Email || !rules.empty.test(obj.Email.trim())) errors.Email.push(validationErrors.emailRequired);

    if (!rules.validName.test(obj.Firstname)) errors.Firstname.push(validationErrors.validFName);
    if (!rules.validName.test(obj.Lastname)) errors.Lastname.push(validationErrors.validLName);
    if (!rules.nameLength.test(obj.Firstname)) errors.Firstname.push(validationErrors.fnameLength);
    if (!rules.nameLength.test(obj.Lastname)) errors.Lastname.push(validationErrors.lnameLength);
    if (!rules.validEmail.test(obj.Email)) errors.Email.push(validationErrors.validEmail);
    if (!rules.validPassword.test(obj.Password)) errors.Password.push(validationErrors.validPassword);
    if (!rules.passwordLength.test(obj.Password)) errors.Password.push(validationErrors.passwordLength);

    Object.keys(errors).forEach(key => (errors[key].length === 0 ? delete errors[key] : ''));
    return errors;
  }

  /**
   * Initialise all errors as an array
   */
  static errorsArr(obj) {
    const errors = {};
    Object.keys(obj).forEach((key) => {
      errors[`${key}`] = [];
    });
    return errors;
  }

  /**
   *  * validate account
   *  * @param {String} owner
   *  * @param {String} type
   *  * @return {Object} errors
   *  */

  static validateAccount(obj) {
    const errors = ValidateHelper.errorsArr(obj);

    if (!obj.Type || !rules.empty.test(obj.Type)) errors.Type.push(validationErrors.accountTypeRequired);
    if (!rules.accountType.test(obj.Type)) errors.Type.push(validationErrors.validType);

    Object.keys(errors).forEach(key => (errors[key].length === 0 ? delete errors[key] : ''));
    return errors;
  }

  /**
   *  * validate account status
   *  * @param {String} status
   *  * @return {Object} errors
   *  */
  static validateUpdateAccountStatus(obj) {
    const errors = ValidateHelper.errorsArr(obj);

    if (!obj.Status || !rules.empty.test(obj.Status)) errors.Status.push(validationErrors.statusRequired);
    if (!rules.accountStatus.test(obj.Status)) errors.Status.push(validationErrors.validStatus);

    Object.keys(errors).forEach(key => (errors[key].length === 0 ? delete errors[key] : ''));
    return errors;
  }

  /*
   * check if id is valid
    * @param {Object} request
    *  * @return {boolean} true
    *  */
  static checkValidAccountNumber(number) {
    if (rules.validInt.test(number)) {
      if (number.length === 10) {
        return true;
      }
    }
    return false;
  }

  /**
   *  * check if id is valid
   *  * @param {Object} request
   *  * @return {boolean} true
   *  */
  static checkValidId(number) {
    if (rules.validInt.test(number)) {
      return true;
    }
    return false;
  }

  /**
   *  * check if email is valid
   *  * @param {Object} request
   *  * @return {boolean} true
   * */
  static checkValidEmail(email) {
    if (rules.validEmail.test(email.trim())) {
      return true;
    }
    return false;
  }

  /**
   *  * validate cashier, amount, type
   *  * @param {String} name
   *  * @param {String} email
   *  * @return {Object} errors
   *  */
  static validateDebitAccount(obj) {
    const errors = ValidateHelper.errorsArr(obj);

    if (!obj.Amount || !rules.empty.test(obj.Amount)) errors.Amount.push(validationErrors.amountRequired);
    if (!rules.validAmount.test(obj.Amount)) errors.Amount.push(validationErrors.validAmount);
    if (!obj.Type || !rules.empty.test(obj.Type)) errors.Type.push(validationErrors.debitTypeRequired);
    if (obj.Type !== 'debit') errors.Type.push(validationErrors.validDebitType);
    Object.keys(errors).forEach(key => (errors[key].length === 0 ? delete errors[key] : ''));
    return errors;
  }

  /**
   *  * validate cashier, amount, type
   * * @param {String} name
   *  * @param {String} email
   *  * @return {Object} errors
   *  */
  static validateCreditAccount(obj) {
    const errors = ValidateHelper.errorsArr(obj);

    if (!obj.Amount || !rules.empty.test(obj.Amount)) errors.Amount.push(validationErrors.amountRequired);
    if (!rules.validAmount.test(obj.Amount)) errors.Amount.push(validationErrors.validAmount);
    if (!obj.Type || !rules.empty.test(obj.Type)) errors.Type.push(validationErrors.creditTypeRequired);
    if (obj.Type !== 'credit') errors.Type.push(validationErrors.validCreditType);
    Object.keys(errors).forEach(key => (errors[key].length === 0 ? delete errors[key] : ''));
    return errors;
  }

  /**
   *  * check if data validation produces any errors
   *  * @param {Object} request
   *  * @return {boolean} false
   *  */
  static checkValidationErrors(response, errors, next) {
    if (Object.keys(errors).length > 0) {
      return response.status(400).json({
        status: 400,
        error: errors,
      });
    }
    return next();
  }

}
export default ValidateHelper;
