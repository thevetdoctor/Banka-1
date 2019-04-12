import UsersController from "../controller/UsersController";
import AccountsController from "../controller/AccountsController";
import ValidateUser from "../middleware/userValidator";
import ValidateAccount from "../middleware/accountValidator";

const routes = (app) => {
	app.get("/", (request, response) => response.status(200).send({
		status: 200,
		message: "Welcome to Banka Application",
	}));



	app.post("/api/v1/auth/signup", ValidateUser.validateSignup, ValidateUser.checkDuplicateEmail, UsersController.signup);
	app.post('/api/v1/auth/signin', ValidateUser.validateSignin, UsersController.signIn);
	app.post('/api/v1/accounts', ValidateAccount.validateCreateAccount, ValidateAccount.checkDuplicateAccount, AccountsController.createAccount);
};
export default routes;