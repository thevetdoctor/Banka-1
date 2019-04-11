import rules from "../helpers/validationRules";
import validationErrors from "../helpers/validationErrors";
import ValidationHelper from "../helpers/validationHelper";
import database from "../models/database";

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
			password
		} = request.body;

		const userErrors = ValidationHelper.validateUser(email, firstName, lastName,  true);

		let errors = {};

		if (!password || !rules.empty.test(password)) {
			errors.passwordEmpty = validationErrors.passwordEmpty;
		}
		if (!rules.validPassword.test(password)) errors.validPassword = validationErrors.validPassword;
		if (!rules.passwordLength.test(password)) {
			errors.passwordLength = validationErrors.passwordLength;
		}

		errors = Object.assign(errors, userErrors);
		ValidationHelper.checkValidationErrors(response, errors, next);
	}



	/**
   * check if user email already exists
   * @param {String} email
   * @return {object}
   */
	static checkDuplicateEmail(request, response, next) {
   		const users = database.findAll("user");
   		const findEmail = users.filter(value => {
   			return value.email == request.body.email.toLowerCase();
   		});
   		if(findEmail.length > 0) {
   			return response.status(406)
				.json({
					status: 406,
					error: validationErrors.emailExists,
				});
   		}
   		 return next();
	}
}
export default ValidateUser;