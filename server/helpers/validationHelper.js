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