import url from 'url';
import querystring from 'querystring';
import UsersController from "../controller/UsersController";
import AccountsController from "../controller/AccountsController";
import TransactionsController from "../controller/TransactionsController";
import ValidateUser from "../middleware/userValidator";
import ValidateAccount from "../middleware/accountValidator";
import ValidateTransaction from "../middleware/transactionValidator";
import userAuthenticate from "../middleware/userAuthenticate";


const routes = (app) => {
	// app.get("/", (request, response) => response.status(200).send({
	// 	status: 200,
	// 	message: "Welcome to Banka Application",
	// }));

	// const rawUrl = 'accounts?status=dormant';
	// const parseUrl = url.parse(rawUrl);
	// const parsedQs = querystring.parse(parseUrl.query)


	app.post("/api/v1/auth/signup", ValidateUser.validateSignup, ValidateUser.checkDuplicateEmail, UsersController.signup);
	app.post('/api/v1/auth/signin', ValidateUser.validateSignin, UsersController.signIn);
	app.post('/api/v1/accounts', userAuthenticate.authenticateUser, ValidateAccount.validateCreateAccount, ValidateAccount.checkDuplicateAccount, AccountsController.createAccount);
	app.put('/api/v1/account/:accountNumber', userAuthenticate.authenticateAdmin, ValidateAccount.validateAccountNumber, ValidateAccount.validateAccountStatus, AccountsController.updateAccountStatus);
	app.delete('/api/v1/accounts/:accountNumber', userAuthenticate.authenticateAdmin, ValidateAccount.validateAccountNumber,  AccountsController.deleteBankAccount);
	app.post('/api/v1/transactions/:accountNumber/credit', userAuthenticate.authenticateStaff, ValidateAccount.validateAccountNumber, ValidateTransaction.validateCreditAccount, TransactionsController.creditAccount);
	app.post('/api/v1/transactions/:accountNumber/debit', userAuthenticate.authenticateStaff, ValidateAccount.validateAccountNumber, ValidateTransaction.validateDebitAccount, TransactionsController.debitAccount);
	app.get('/api/v1/accounts/:accountNumber/transactions', userAuthenticate.authenticateUser, ValidateAccount.validateAccountNumber, TransactionsController.getUserAccountHistory);
	app.get('/api/v1/transactions/:id', userAuthenticate.authenticateUser, ValidateAccount.validateId, TransactionsController.getUserTransaction);
	app.get('/api/v1/user/:email/accounts', userAuthenticate.authenticateUser, ValidateAccount.validateEmail, AccountsController.getUserAccounts);
	app.get('/api/v1/accounts/:accountNumber', userAuthenticate.authenticateUser, ValidateAccount.validateAccountNumber, AccountsController.getUserAccount);
	app.get('/api/v1/accounts', userAuthenticate.authenticateAdmin, AccountsController.getAllAccounts);
	
};	
export default routes;