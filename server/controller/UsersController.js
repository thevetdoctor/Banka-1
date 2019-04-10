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
      firstName,
      lastName,
      email,
      type,
      isAdmin
    } = request.body;

    let {
      password
    } = request.body;

    password = passwordHelper.passwordHash(password.trim());
    const data = database.create("user", request.body)
    if(data.status == 200) {
    	return response.send(data)
    } else {
    	return response.send(data)
    }
  }

}

export default UsersController;