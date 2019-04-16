import UsersController from "../controller/UsersController";
import AccountsController from "../controller/AccountsController";
import TransactionsController from "../controller/TransactionsController";
import ValidateUser from "../middleware/userValidator";
import ValidateAccount from "../middleware/accountValidator";
import ValidateTransaction from "../middleware/transactionValidator";


const routes = (app) => {
	// app.get("/", (request, response) => response.status(200).send({
	// 	status: 200,
	// 	message: "Welcome to Banka Application",
	// }));



	app.post("/api/v1/auth/signup", ValidateUser.validateSignup, ValidateUser.checkDuplicateEmail, UsersController.signup);
	app.post('/api/v1/auth/signin', ValidateUser.validateSignin, UsersController.signIn);
	app.post('/api/v1/accounts', ValidateAccount.validateCreateAccount, ValidateAccount.checkDuplicateAccount, AccountsController.createAccount);
	app.put('/api/v1/account/:accountNumber', ValidateAccount.validateAccountNumber, ValidateAccount.validateAccountStatus, AccountsController.updateAccountStatus);
	app.delete('/api/v1/accounts/:accountNumber', ValidateAccount.validateAccountNumber,  AccountsController.deleteBankAccount);
	app.post('/api/v1/transactions/:accountNumber/credit', ValidateAccount.validateAccountNumber, ValidateTransaction.validateCreditAccount, TransactionsController.creditAccount);
	app.post('/api/v1/transactions/:accountNumber/debit', ValidateAccount.validateAccountNumber, ValidateTransaction.validateDebitAccount, ValidateTransaction.checkAmount, TransactionsController.debitAccount);
};	
export default routes;