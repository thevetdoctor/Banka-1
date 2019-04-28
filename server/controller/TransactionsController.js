import db from '../helpers/query';
import validationErrors from '../helpers/validationErrors';


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
    const balance = `SELECT * FROM accounts WHERE accountnumber ='${accountNumber}'`;

    const rows = db.dbQuery(balance);
    rows.then((dbResult) => {
      if (dbResult.rowCount > 0) {
        if (dbResult.rows[0].balance >= amount) {
          if (dbResult.rows[0].status === 'active') {
            const newbalance = parseFloat(dbResult.rows[0].balance) - parseFloat(amount);
            const oldBalance = dbResult.rows[0].balance;
            const newQuery = {
              text: `INSERT INTO transactions(cashier, amount, type, accountnumber, oldbalance, newbalance) 
              VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
              values: [request.token.user.id, amount, type.trim(), accountNumber, oldBalance, newbalance],
            };
            TransactionsController.runAccountQuery(response, newQuery);
          } else {
            return response.status(200).json({
              status: 200,
              error: validationErrors.accountNotActive,
            });
          }
        } else {
          return response.status(200).json({
            status: 200,
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

    const balance = `SELECT balance FROM accounts WHERE accountnumber ='${accountNumber}'`;
    const rows = db.dbQuery(balance);
    rows.then((dbResult) => {
      if (dbResult.rowCount > 0) {
        const newbalance = parseFloat(dbResult.rows[0].balance) + parseFloat(amount);
        const oldBalance = dbResult.rows[0].balance;
        const newQuery = {
          text: `INSERT INTO transactions(cashier, amount, type, accountnumber, oldbalance, newbalance) 
          VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
          values: [request.token.user.id, amount, type.trim(), accountNumber, oldBalance, newbalance],
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
        const updateQuery = `UPDATE accounts set balance = '${updateResult.rows[0].newbalance}' 
        WHERE accountnumber=${updateResult.rows[0].accountnumber} RETURNING *`;
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
    const { id, type } = request.token.user;
    let query = `SELECT transactions.id, transactions.accountnumber, transactions.cashier, transactions.amount, 
    transactions.type, transactions.oldbalance, transactions.newbalance, transactions.createdon 
    FROM transactions INNER JOIN accounts ON accounts.accountnumber =
     transactions.accountnumber WHERE accounts.owner ='${id}' AND transactions.accountnumber ='${accountNumber}'`;

    if (type === 'staff') {
      query = `SELECT * FROM transactions WHERE accountnumber ='${accountNumber}'`;
    }

    db.dbQuery(query)
      .then((dbResult) => {
        if (dbResult.rowCount === 0) {
          return response.status(200).json({
            status: 200,
            error: validationErrors.historyNotFOund,
          });
        }
        TransactionsController.getTransactionSuccess(response, dbResult);
      });
    // .catch((error) => { response.status(500).send(error); });
  }

  /**
   *  Return a specific account transaction response
   *  @param {Object} response
   *  @return {Object} json
   */
  static getTransactionById(request, response) {
    const { id } = request.params;
    const { type } = request.token.user;
    let query = `SELECT transactions.id, transactions.accountnumber, transactions.cashier, transactions.amount, 
    transactions.type, transactions.oldbalance, transactions.newbalance, transactions.createdon 
    FROM transactions INNER JOIN accounts ON accounts.accountnumber =
     transactions.accountnumber WHERE accounts.owner ='${request.token.user.id}' AND transactions.id ='${id}'`;

    if (type === 'staff') {
      query = `SELECT * FROM transactions WHERE id ='${id}'`;
    }
    db.dbQuery(query)
      .then((dbResult) => {
        if (!dbResult.rows[0]) {
          return response.status(200).json({
            status: 200,
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
      data: dbResult.rows,
    });
  }
}

export default TransactionsController;
