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


		/**
   *  User change Bank Account Status
   *  @param {Object} request
   *  @param {Object} response
   *  @return {Object} json
   */

    static updateAccountStatus(request, response) {
    	const { accountNumber } = request.params;
		const { status } = request.body;

		const updatedData = database.updateAccountStatus(request.body, accountNumber, "account");

		if(updatedData.hasOwnProperty('data')) {
			AccountsController.updateAccountSuccess(response, updatedData.data);	
		} else {
			return response.status(404).json({
				status: 404,
				error: "Account Number not found",
			})
		}
    	
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
      	accountNumber: dbResult.accountNumber,
      	status: dbResult.status
      }
    });
  }
 }

 export default AccountsController;