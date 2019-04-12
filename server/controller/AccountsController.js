import database from "../models/database";

class AccountsController {
	/**
   *  User create bank account
   *  @param {Object} request
   *  @param {Object} response
   *  @return {Object} json
   */

   static createAccount(request, response) {
		const {
			owner,
			type
		} = request.body;


		const newData = database.create(request.body, "account");
    	AccountsController.createAccountQuery(request, response, newData.data);
		
	}

	/**
   *  Run user createAccount query
   *  @param {Object} request
   *  @param {Object} response
   * @param {String} query
   *  @return {Object} json
   *
   */
	static createAccountQuery(request, response, newData) {
		 const users = database.findAll("user");
		   const findUser = users.filter(value => {
		   			return value.id == request.body.owner;
		   		});
		   
		    if(findUser.length > 0) {
	   		return response.status(201).json({
			status: 201,
			data: {
				accountNumber: newData.accountNumber,
				firstName: findUser[0].firstName,
				lastName: findUser[0].lastName,
				email: findUser[0].email,
				type: newData.type,
				openingBalance: newData.balance
			}
		});
	  	 
	  	 }
    
	}
 }

 export default AccountsController;