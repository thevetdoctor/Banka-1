const newUsers = [
	{
		firstName: "James",
		lastName: "Ugbanu",
		email: "james@gmail.com",
		password: "thankyou",
	},
	{
		firstName: "Joe",
		lastName: "Spenser",
		email: "joespen@gmail.com",
		password: "hopeful",
	},
	{
		firstName: "Afred",
		lastName: "Juan",
		email: "jab@gmail.com",
		password: "1234jk",
		type: "staff",
		isAdmin: 1,
	},
	{
		firstName: "Afred",
		lastName: "Juan",
		email: "test@gmail.com",
		password: "whyask",
		type: "staff",
		isAdmin: 1,
	},
];

const newAccounts = [
	{
		owner: 1,
		type: "savings",
	},
	{
		owner: 2,
		type: "current",
	},
];

const newTransactions = [
	{
		cashier: 1,
		amount: 150.00,
		type: "credit",
	},
	{
		cashier: 1,
		amount: 100.00,
		type: "debit",
	},
];

export default { newUsers, newAccounts, newTransactions };
