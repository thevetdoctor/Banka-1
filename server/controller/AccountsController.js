import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../helpers/query';
import config from '../config/config';
import serialNumber from '../helpers/serialNumber';
import validationErrors from '../helpers/validationErrors';

dotenv.config();
const { secretKey } = config;

class AccountsController {
  /**
   *  User create bank account
   *  @param {Object} request
   *  @param {Object} response
   *  @return {Object} json
   */

  static createAccount(request, response) {
    const {
      type,
    } = request.body;

    let id;
    db.dbQuery('SELECT * FROM accounts ORDER BY createdon DESC LIMIT 1')
      .then((result) => {
        if (!result.rows.length) {
          id = 1;
        } else {
          id = result.rows[0].id + 1;
        }


        const token = request.headers['x-access'] || request.headers.token
        || request.query.token;
        const verifiedToken = jwt.verify(token, secretKey);

        const query = {
          text: 'INSERT INTO accounts(accountnumber, owner, type) VALUES ($1, $2, $3) RETURNING *',
          values: [serialNumber.serialNumber(id), verifiedToken.user.id, type.trim()],
        };

        AccountsController.createAccountQuery(request, response, query);
      });
  }

  /**
   *  Run user createAccount query
   *  @param {Object} request
   *  @param {Object} response
   * @param {String} query
   *  @return {Object} json
   *
   */
  static createAccountQuery(request, response, query) {
    db.dbQuery(query)
      .then(dbResult => response.status(201).json({
        status: 201,
        data: {
          accountNumber: dbResult.rows[0].accountnumber,
          firstName: dbResult.rows[0].firstname,
          lastName: dbResult.rows[0].lastname,
          type: dbResult.rows[0].type,
          openingBalance: dbResult.rows[0].balance,
        },
      }));
    // .catch(error => response.status(500).send(error));
  }


  /**
   *  User change Bank Account Status
   *  @param {Object} request
   *  @param {Object} response
   *  @return {Object} json
   */

  static updateAccountStatus(request, response) {
    const { accountNumber } = request.params;
    let { status } = request.body;
    status = status.trim();
    const query = `UPDATE accounts set status = '${status}' WHERE
     accountnumber=${accountNumber} RETURNING *`;

    db.dbQuery(query)
      .then((dbResult) => {
        if (!dbResult.rows[0]) {
          return response.status(200).json({
            status: 200,
            error: validationErrors.accountNotFound,
          });
        }
        return AccountsController.updateAccountSuccess(response, dbResult);
      });
    // .catch((error) => { response.status(500).send(error); });
  }

  /**
   *  Return update account status response
   *  @param {Object} response
   *  @param {Object} dbResult
   *  @return {Object} json
   *
  */
  static updateAccountSuccess(response, dbResult) {
    return response.status(202).json({
      status: 202,
      data: {
        accountNumber: dbResult.rows[0].accountnumber,
        status: dbResult.rows[0].status,
      },
    });
  }

  /**
   *  Delete bank account
   *  @param {Object} request
   *  @param {Object} response
   *  @return {Object} json
   */
  static deleteBankAccount(request, response) {
    const { accountNumber } = request.params;

    const query = `DELETE from accounts WHERE accountnumber = ${accountNumber}`;
    db.dbQuery(query)
      .then((dbResult) => {
        if (!dbResult.rowCount) {
          return response.status(200).json({
            status: 200,
            error: validationErrors.accountNotFound,
          });
        }
        return AccountsController.deleteBankAccountSuccess(response);
      });
    // .catch((error) => { response.status(500).send(error); });
  }

  /**
   *  Return delete bank account success response
   *  @param {Object} response
   *  @return {Object} json
   *
   */
  static deleteBankAccountSuccess(response) {
    return response.status(202).json({
      status: 202,
      message: 'Account successfully deleted',
    });
  }

  /**
   *  Return user account response
   *  @param {Object} response
   *  @return {Object} json
   *
   */
  static getUserAccounts(request, response) {
    const { email } = request.params;
    const query = `SELECT accounts.createdOn, accounts.accountnumber, 
    accounts.type, accounts.status, accounts.balance FROM users
     LEFT JOIN accounts ON accounts.owner = users.id
     WHERE email ='${email}'`;

    db.dbQuery(query)
      .then((dbResult) => {
        if (!dbResult.rows[0]) {
          return response.status(200).json({
            status: 200,
            error: validationErrors.accountNotFound,
          });
        }
        AccountsController.getUserAccountsSuccess(response, dbResult);
      });
    // .catch((error) => { response.status(500).send(error); });
  }


  /**
   *  Return user account response
   *  @param {Object} response
   *  @return {Object} json
   *
   */
  static getUserAccount(request, response) {
    const { accountNumber } = request.params;

    const query = `SELECT accounts.createdOn, accounts.accountnumber, users.email, accounts.type, 
    accounts.status, accounts.balance FROM accounts LEFT JOIN users ON users.id =
     accounts.owner WHERE accountnumber ='${accountNumber}'`;

    db.dbQuery(query)
      .then((dbResult) => {
        if (!dbResult.rows[0]) {
          return response.status(200).json({
            status: 200,
            error: validationErrors.accountNotFound,
          });
        }
        AccountsController.getAccountsSuccess(response, dbResult);
      });
    // .catch((error) => { response.status(500).send(error); });
  }


  /**
   *  Return user account response
   *  @param {Object} response
   *  @return {Object} json
   *
   */
  static getAllAccounts(request, response) {
    let query;
    if (request.query.status === 'dormant') {
      query = `SELECT * FROM accounts WHERE status = '${request.query.status}'`;

      db.dbQuery(query)
        .then((dbResult) => {
          if (!dbResult.rows[0]) {
            return response.status(200).json({
              status: 200,
              error: validationErrors.accountNotFound,
            });
          }
          AccountsController.getAccountsSuccess(response, dbResult);
        });
      // .catch((error) => { response.status(500).send(error); });
    } else if (request.query.status === 'active') {
      query = `SELECT * FROM accounts WHERE status = '${request.query.status}'`;

      db.dbQuery(query)
        .then((dbResult) => {
          if (!dbResult.rows[0]) {
            return response.status(200).json({
              status: 200,
              error: validationErrors.accountNotFound,
            });
          }
          AccountsController.getAccountsSuccess(response, dbResult);
        });
      // .catch((error) => { response.status(500).send(error); });
    }
    query = 'SELECT * FROM accounts';

    db.dbQuery(query)
      .then((dbResult) => {
        AccountsController.getAccountsSuccess(response, dbResult);
      });
    // .catch((error) => { response.status(500).send(error); });
  }


  /**
   *  Return user account response
   *  @param {Object} response
   *  @param {Object} dbResult
   *  @return {Object} json
   *
   */
  static getUserAccountsSuccess(response, dbResult) {
    return response.status(200).json({
      status: 200,
      accounts: dbResult.rows,
    });
  }

  /**
   *  Return account response
   *  @param {Object} response
   *  @param {Object} dbResult
   *  @return {Object} json
   *
   */
  static getAccountsSuccess(response, dbResult) {
    return response.status(200).json({
      status: 200,
      data: dbResult.rows,
    });
  }
}

export default AccountsController;
