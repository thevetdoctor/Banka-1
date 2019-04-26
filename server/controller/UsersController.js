import db from '../helpers/query';
import passwordHelper from '../helpers/password';
import generateToken from '../helpers/token';
import validationErrors from '../helpers/validationErrors';


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
      password,
      type,
    } = request.body;
    let userType = type;
    if (!type) {
      userType = 'client';
    }

    const hashedPassword = passwordHelper.hashPassword(password.trim());

    const query = {
      text: 'INSERT INTO users(firstname, lastname, email, password, type) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      values: [firstName.trim(), lastName.trim(), email.trim(), hashedPassword, userType],
    };
    UsersController.signupQuery(request, response, query);
  }

  /**
   *  Run user signup query
   *  @param {Object} request
   *  @param {Object} response
   * @param {String} query
   *  @return {Object} json
   *
   */
  static signupQuery(request, response, query) {
    db.dbQuery(query)
      .then((dbResult) => {
        const currentToken = generateToken({ id: dbResult.rows[0].id, type: dbResult.rows[0].type, isadmin: dbResult.rows[0].isadmin });
        process.env.CURRENT_TOKEN = currentToken;
        return response.status(201).json({
          status: 201,
          data: {
            token: currentToken,
            id: dbResult.rows[0].id,
            firstName: dbResult.rows[0].firstname,
            lastName: dbResult.rows[0].lastname,
            email: dbResult.rows[0].email,
          },
        });
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
    const query = `SELECT * FROM users WHERE email = '${email}'`;

    db.dbQuery(query)
      .then((dbResult) => {
        if (dbResult.rowCount === 0) return UsersController.wrongEmailResponse(response);
        if (!passwordHelper.comparePasswords(password.trim(), dbResult.rows[0].password)) {
          return UsersController.passwordFailureResponse(response);
        }

        const token = generateToken({ id: dbResult.rows[0].id, type: dbResult.rows[0].type, isadmin: dbResult.rows[0].isadmin });
        process.env.CURRENT_TOKEN = token;

        return UsersController.loginSuccessResponse(response, token, dbResult.rows[0]);
      });
    // .catch(error => {
    //   return response.status(500).send(error);
    //    });
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
        firstName: data.firstname,
        lastName: data.lastname,
        email: data.email,
      },
    });
  }
}

export default UsersController;
