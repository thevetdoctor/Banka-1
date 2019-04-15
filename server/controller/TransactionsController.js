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


		const transactions = database.findAll("transaction");
		  const findDebitTransactions = transactions.filter(value => {
   			return value.type == 'credit';
   		});

		if(!findDebitTransactions.length) {
			TransactionsController.debitError(response)	
		} else {
			let transactions = transactions[transactions.length - 1]
			let balance = transactions.balance - amount;
			let oldBalance = transactions.balance
			const newData = database.create(request.body, "transaction", { accountNumber, cashier, amount, type, balance, oldBalance});
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

		/**
   *  Run user debit account query
   *  @param {Object} request
   *  @param {Object} response
   * @param {String} query
   *  @return {Object} json
   *
   */
	static debitError(response, newData) {
		return response.status(406).json({
			status: 406,
			error: validationErrors.insufficientFund,
		});
    
	}
}

export default TransactionsController;