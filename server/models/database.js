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
				},
				{
					"id": 2,
					"firstName": "john",
					"lastName": "Theme",
					"email": "jt@gmail.com",
					"type": "staff",
					"password": "12345",
					"isAdmin": 1
				}

			],
			"account": [],
			"transaction": []		
		};
	}
	create(data, table) {
		let newTable;
		if(table == "user") {
				 newTable = {
				id: this.database[table].length + 1,
				email: data.email.toLowerCase() || "",
				firstName: data.firstName || "",
				lastName: data.lastName || "",
				password: data.hashedPassword || "",
				type: data.type || "staff",
				isAdmin: data.isAdmin || 1
			};

		} else if(table == "account") {
				 newTable = {
				id: this.database[table].length + 1,
				accountNumber: serialNumber.serialNumber(this.database[table].length + 1) || "",
				createOn: Date.now(),
				owner: parseInt(data.owner) || "",
				type: data.type || "",
				status: "draft",
				balance: 0.00
			};
		} else if(table == "transaction")  {
				 newTable = {
				id: this.database[table].length + 1,
				createOn: Date.now(),
				type: data.type || "",
				accountNumber: data.accountNumber || "",
				cashier: data.cashier || "",
				amount: data.amount || "",
				oldBalance: data.oldBalance || 0.00,
				balance: data.balance || data.amount
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

		   	   findAccount[0].status = data.status

		   	   const success = {
			"data": findAccount[0]
			};
			return success;

		   
		}
	
}
export default new Database();