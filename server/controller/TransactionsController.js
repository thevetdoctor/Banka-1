import database from "../models/database";
import validationErrors from "../helpers/validationErrors";

class TransactionsController {
	/**
   *  Debit a bank account
   *  @param {Object} request
   *  @param {Object} response
   *  @return {Object} json
   */
	static debitAccount(request, response) {
		const {
			cashier,
			amount,
			type
		} = request.body;
		let {accountNumber} = request.params;


		let transactions = database.findAll("transaction");

			 transactions = transactions[transactions.length - 1]
			let balance = transactions.balance - amount;
			let oldBalance = transactions.balance
			const newData = database.create({ accountNumber, cashier, amount, type, balance, oldBalance}, "transaction");
	    	TransactionsController.runAccountQuery(response, newData.data);
		
	}

	/**
   *  Debit a bank account
   *  @param {Object} request
   *  @param {Object} response
   *  @return {Object} json
   */
	static creditAccount(request, response) {
		const {
			cashier,
			amount,
			type
		} = request.body;
		let {accountNumber} = request.params;


		let transactions = database.findAll("transaction");
		
		if(transactions.length === 0) {

			const newData = database.create( {cashier, amount, type, accountNumber}, "transaction");
	    	TransactionsController.runAccountQuery(response, newData.data);	
		} else {
			 transactions = transactions[transactions.length - 1]
			let balance = parseFloat(transactions.balance) + parseFloat(amount);
			let oldBalance = transactions.balance
			const newData = database.create({ accountNumber, cashier, amount, type, balance, oldBalance}, "transaction");
	    	TransactionsController.runAccountQuery(response, newData.data);
		}
		
	}


	/**
   *  Run user debit account query
   *  @param {Object} request
   *  @param {Object} response
   * @param {String} query
   *  @return {Object} json
   *
   */
	static runAccountQuery(response, newData) {
		return response.status(201).json({
			status: 201,
			data: {
				id: newData.id,
				accountNumber: newData.accountNumber,
				amount: newData.amount,
				cashier: newData.cashier,
				transactionType: newData.type,
				accountBalance: newData.balance
			}
		});
    
	}
}

export default TransactionsController;