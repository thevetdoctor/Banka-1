const newUsers = [
	 {
		  firstName: 'james',
		  lastName: 'Joseph',
		  email: 'p@gmail.com',
		  password: '123456' 
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
		amount: 150,
		type: "credit",
	},
	{
		amount: 100,
		type: "debit",
	},
];

export default { newUsers, newAccounts, newTransactions };
