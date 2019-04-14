import passwordHelper from "../helpers/password";
import serialNumber from "../helpers/serialNumber";

class Database {
 
	constructor() {
		this.id = 1;
		this.database = {
			"user": [
				{
					"id": 1,
					"firstName": "james",
					"lastName": "Joseph",
					"email": "james@test.com",
					"type": "client",
					"password": "12345",
					"isAdmin": 0
				}
			],
			"account": [],
			"transaction": []		
		};
	}
	create(data, table) {
		let newTable;
		if(table == "user") {
				let password = data.password

				password = passwordHelper.hashPassword(password.trim());
				 newTable = {
				id: this.database[table].length + 1,
				email: data.email.toLowerCase() || "",
				firstName: data.firstName || "",
				lastName: data.lastName || "",
				password: password || "",
				type: data.type || "staff",
				isAdmin: data.isAdmin || 0
			};

		} else if(table == "account") {
				 newTable = {
				id: this.database[table].length + 1,
				accountNumber: serialNumber.serialNumber(this.database[table].length + 1) || "",
				createOn: Date.now(),
				owner: parseInt(data.owner) || "",
				type: data.type || "",
				status: "draft",
				balance: 0
			};
		} else {
				 newTable = {
				id: this.database[table].length + 1,
				createOn: Date.now(),
				type: data.type || "",
				accountNumber: data.accountNumber || "",
				cashier: data.cashier || "",
				amount: data.amount || "",
				oldBalance: data.oldBalance || "",
				balance: data.balance || ""
			};	
		}
			
		this.database[table].push(newTable);
		const success = {
			"status": 201,
			"data": newTable
		};
		return success;
	}

	findAll(table) {
		return this.database[table];
	}

	updateAccountStatus(data,accountNumber,table) {
		 const accountTable = this.database[table];
		   const findAccount = accountTable.filter(value => {
		   			return value.accountNumber == accountNumber;
		   		});

		   if(findAccount.length > 0) {
		   	   findAccount[0].status = data.status
		   }
		   const success = {
			"data": findAccount[0]
			};
			return success;
		}
	
}
export default new Database();