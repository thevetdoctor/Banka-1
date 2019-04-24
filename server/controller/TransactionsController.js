import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../helpers/query';
import config from '../config/config';
import validationErrors from '../helpers/validationErrors';

dotenv.config();
const { secretKey } = config;

class TransactionsController {
  /**
   *  Debit a bank account
   *  @param {Object} request
   *  @param {Object} response
   *  @return {Object} json
   */
  static debitAccount(request, response) {
    const {
      amount,
      type,
    } = request.body;
    const { accountNumber } = request.params;

    const token = request.headers['x-access'] || request.headers.token || request.query.token;
    const verifiedToken = jwt.verify(token, secretKey);
    const balance = `SELECT * FROM accounts WHERE accountnumber ='${accountNumber}'`;

    const rows = db.dbQuery(balance);
    rows.then((dbResult) => {
      if (dbResult.rowCount > 0) {
        if (dbResult.rows[0].balance >= amount) {
          if (dbResult.rows[0].status === 'active') {
 						const newbalance = parseFloat(dbResult.rows[0].balance) - parseFloat(amount);
            const oldBalance = dbResult.rows[0].balance;
		        	const newQuery = {
			      text: 'INSERT INTO transactions(cashier, amount, type, accountnumber, oldbalance, newbalance) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
			      values: [verifiedToken.user.id, amount, type.trim(), accountNumber, oldBalance, newbalance],
			    };
			    		TransactionsController.runAccountQuery(response, newQuery);
 							} else {
 								return response.status(400).json({
							          status: 400,
							          error: validationErrors.accountNotActive,
			 						});
 							}
 						} else {
 							return response.status(400).json({
				          status: 400,
				          error: validationErrors.insufficientFund,
 						});
 					}
 					}
 				});
  }

  /**
   *  Debit a bank account
   *  @param {Object} request
   *  @param {Object} response
   *  @return {Object} json
   */
  static creditAccount(request, response) {
    const {
      amount,
      type,
    } = request.body;
    const { accountNumber } = request.params;

    const token = request.headers['x-access'] || request.headers.token || request.query.token;
    const verifiedToken = jwt.verify(token, secretKey);

 		const balance = `SELECT balance FROM accounts WHERE accountnumber ='${accountNumber}'`;


 				const rows = db.dbQuery(balance);

 				rows.then((dbResult) => {
 					if (dbResult.rowCount > 0) {
 						const newbalance = parseFloat(dbResult.rows[0].balance) + parseFloat(amount);
        const oldBalance = dbResult.rows[0].balance;
		        	const newQuery = {
			      text: 'INSERT INTO transactions(cashier, amount, type, accountnumber, oldbalance, newbalance) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
			      values: [verifiedToken.user.id, amount, type.trim(), accountNumber, oldBalance, newbalance],
			    };
			    TransactionsController.runAccountQuery(response, newQuery);
 					}
 				});
  }


  /**
   *  Run user debit account query
   *  @param {Object} request
   *  @param {Object} response
   * @param {String} query
   *  @return {Object} json
   *
   */
  static runAccountQuery(response, newQuery) {
    db.dbQuery(newQuery)
      .then((updateResult) => {
        const updateQuery = `UPDATE accounts set balance = '${updateResult.rows[0].newbalance}' WHERE accountnumber=${updateResult.rows[0].accountnumber} RETURNING *`;

		 			db.dbQuery(updateQuery)
			 			.then(dbResult => response.status(201).json({
				          status: 201,
				          data: {
				          	  id: updateResult.rows[0].id,
				              accountNumber: updateResult.rows[0].accountnumber,
				              amount: updateResult.rows[0].amount,
				              cashier: updateResult.rows[0].cashier,
				              transactionType: updateResult.rows[0].type,
				              accountBalance: dbResult.rows[0].balance,
				          		},
				       		 }));
      });
  }

	 /**
   *  Return an account's transaction history response
   *  @param {Object} response
   *  @return {Object} json
   *
   */
  static getUserAccountHistory(request, response) {
    const { accountNumber } = request.params;

    const history = `SELECT * FROM transactions WHERE accountnumber ='${accountNumber}'`;

    db.dbQuery(history)
      .then((dbResult) => {
        TransactionsController.getTransactionSuccess(response, dbResult);
      });
    // .catch((error) => { response.status(500).send(error); });
  }

  /**
   *  Return a specific account transaction response
   *  @param {Object} response
   *  @return {Object} json
   */

 	static getUserTransaction(request, response) {
    const { id } = request.params;

    const query = `SELECT * FROM transactions WHERE id ='${id}'`;

    db.dbQuery(query)
      .then((dbResult) => {
        if (!dbResult.rows[0]) {
          return response.status(404).json({
            status: 404,
            error: validationErrors.historyNotFOund,
          });
        }
        TransactionsController.getTransactionSuccess(response, dbResult);
      });
    // .catch((error) => { response.status(500).send(error); });
  }

  /**
   *  Return transaction account history response
   *  @param {Object} response
   *  @param {Object} dbResult
   *  @return {Object} json
   *
   */
  static getTransactionSuccess(response, dbResult) {
    return response.status(200).json({
      status: 200,
      data: dbResult.rows[0],
    });
  }
}

export default TransactionsController;
