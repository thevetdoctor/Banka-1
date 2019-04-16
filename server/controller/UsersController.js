import passwordHelper from "../helpers/password";
import generateToken from "../helpers/token";
import validationErrors from "../helpers/validationErrors";
import database from "../models/database";
import dotenv from "dotenv";

dotenv.config();

class UsersController {
	/**
   *  Signup a user
   *  @param {Object} request
   *  @param {Object} response
   *  @return {Object} json
   */
	static signup(request, response) {
		const {
			email,
			firstName,
			lastName,
      password
		} = request.body;

      let  hashedPassword = passwordHelper.hashPassword(password.trim());

		const newData = database.create({email, firstName, lastName, hashedPassword}, "user");
    	UsersController.signupQuery(request, response, newData.data);
		
	}

	/**
   *  Run user signup query
   *  @param {Object} request
   *  @param {Object} response
   * @param {String} query
   *  @return {Object} json
   *
   */
	static signupQuery(request, response, newData) {
		const currentToken = generateToken(newData);
    process.env.CURRENT_TOKEN = currentToken;
		return response.status(201).json({
			status: 201,
			data: {
				token: currentToken,
				id: newData.id,
				firstName: newData.firstName,
				lastName: newData.lastName,
				email: newData.email
			}
		});
    
	}

	/**
   *  Sign in user
   *  @param {Object} requestuest
   *  @param {Object} response
   *  @return {Object} json
   */
  static signIn(request, response) {
    const { email, password } = request.body;
   const users = database.findAll("user");
   const findEmail = users.filter(value => {
   			return value.email == request.body.email.toLowerCase();
   		});
  
	   if(findEmail.length == 0) {
	   	return UsersController.wrongEmailResponse(response)
	   }
 
   		if (!passwordHelper.comparePasswords(password.trim(), findEmail[0].password)) {
          return UsersController.passwordFailureResponse(response);
        }
        const currentToken = generateToken(findEmail[0]);
        process.env.CURRENT_TOKEN = currentToken;
        return UsersController.loginSuccessResponse(response, currentToken, findEmail[0]);
  }

    /**
   *  return message for non existent email in login
   *  @param {Object} response
   *  @return {Object} json
   */
  static wrongEmailResponse(response) {
    return response.status(404).json({
      status: 404,
      error: validationErrors.noEmail,
    });
  }

  /**
   *  return message for non matching password in login
   *  @param {Object} response
   *  @return {Object} json
   */
  static passwordFailureResponse(response) {
    return response.status(401).json({
      status: 401,
      error: validationErrors.loginFailure,
    });
  }


  /**
   *  return message for successful login
   *  @param {Object} response
   *  @return {Object} json
   */
  static loginSuccessResponse(response, currentToken, data) {
    return response.status(200).json({
      status: 200,
      data: {
      	token: currentToken,
    		id: data.id, 
    		firstName: data.firstName,
    		lastName: data.lastName,
          }
    });
  }

}

export default UsersController;