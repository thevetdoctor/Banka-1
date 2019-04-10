class Database {
 
	constructor() {
		this.id = 1
		this.database = {
			"user": [],
			"account": [],
			"transaction": []		
		}
	
	}
	create(data, table) {

		if(this.database.hasOwnProperty(table) {
			if(data.user) {
				const newTable = {
				id: this.database[table].length + 1,
				firstName: data.firstName || "",
				lastName: data.lastName || "",
				email: data.email || "",
				type: data.type || "",
				isAdmin: isAdmin || 0
			}
		} else if(data.account) {
				const newTable = {
				id: this.database[table].length + 1,
				accountNumber: data.accountNumber || "",
				createOn: Date.now(),
				owner: data.owner || "",
				type: data.type || "",
				status: data.status || "",
				balance: data.balance || ""
			}
		} else {
				const newTable = {
				id: this.database[table].length + 1,
				createOn: Date.now(),
				type: data.type || "",
				accountNumber: data.accountNumber || "",
				cashier: data.cashier || "",
				amount: data.amount || "",
				oldBalance: data.oldBalance || "",
				balance: data.balance || ""
		}	

			}
			
			this.database[table].push(newTable)
			const success = {
				"status": 200,
					"data": newTable
				}
			return success
		} else {
			const error = {
				"status": 404,
				"error": "Table Not Found"
				}		
			}
			return error
		}
	}

	findAll() {
		return this.orders
	}

	findOne(id) {
		return this.orders.find(order => order.id === parseInt(id))
	}

	update(id, data) {
		const order = this.findOne(id)
		const index = this.orders.indexOf(order)
		this.orders[index].item_id = data["item_id"] || order.item_id
		this.orders[index].user_id = data["user_id"] || order.user_id
		this.orders[index].order_id = data["order_id"] || order.order_id
		this.orders[index].order_status = data["order_status"] || order.order_status
		this.orders[index].modifiedDate = moment.now()
		return this.orders[index]
	}

	delete(id) {
		const order = this.findOne(id)
		const index = this.orders.indexOf(order)
		this.orders.splice(index, 1)
		return {}
	}
}
export default new Database()