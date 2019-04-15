import database from "../models/database";

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
   			return value.type == type.toLowerCase();
   		});

		if(!findDebitTransactions.length) {
			const newData = database.create(request.body, "transaction", accountNumber);
	    	TransactionsController.runAccountQuery(response, newData.data);
		} else {
			let lastTransaction = findDebitTransactions[findDebitTransactions.length - 1]

			console.log(lastTransaction.balance)
			console.log(lastTransaction.oldBalance)
			oldBalance = lastTransaction.balance
			balance = lastTransaction.balance + amount
			return response.status(201).json({
				test: 'hi'
			})
		}
      // let { password } = request.body

      //   password = passwordHelper.hashPassword(password.trim());
		
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