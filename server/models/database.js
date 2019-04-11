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
		if(this.database.hasOwnProperty(table)) {
			if(table == "user") {
				 newTable = {
					id: this.database[table].length + 1,
					email: data.email.toLowerCase() || "",
					firstName: data.firstName || "",
					lastName: data.lastName || "",
					password: data.password || "",
					type: data.type || "staff",
					isAdmin: data.isAdmin || 0
				};

			} else if(table == "account") {
				 newTable = {
					id: this.database[table].length + 1,
					accountNumber: data.accountNumber || "",
					createOn: Date.now(),
					owner: data.owner || "",
					type: data.type || "",
					status: data.status || "",
					balance: data.balance || ""
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
				"status": 200,
				"data": newTable
			};
			return success;
		} else {
			const error = {
				"status": 404,
				"error": "Table Not Found"
			};
			return error;		
		}
	}

	findAll(table) {
		return this.database[table];
	}
	
}
export default new Database();