import UsersController from "../controller/UsersController";
import ValidateUser from "../middleware/userValidator";

const routes = (app) => {
	app.get("/", (request, response) => response.status(200).send({
		status: 200,
		message: "Welcome to Banka Application",
	}));



	app.post("/api/v1/auth/signup", ValidateUser.validateSignup, ValidateUser.checkDuplicateEmail, UsersController.signup);
	app.post('/api/v1/auth/signin', UsersController.signIn);
};
export default routes;