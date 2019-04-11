import passwordHelper from '../helpers/password';
import generateToken from '../helpers/token';
import validationErrors from '../helpers/validationErrors';
import database from "../models/database"

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
      type,
      isAdmin
    } = request.body;

    let {
      password
    } = request.body;

    password = passwordHelper.hashPassword(password.trim());
    const newData = database.create(request.body, "user")
    if(newData.status == 200) {
    	UsersController.signupQuery(request, response, newData.data)
    } else {
    	return response.status(400).send(newData)
    }
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
    const currentToken = generateToken(newData)
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

}

export default UsersController;