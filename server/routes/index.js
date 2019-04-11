import UsersController from '../controller/UsersController';

const routes = (app) => {
  app.get('/', (request, response) => response.status(200).send({
    status: 200,
    message: 'Welcome to Banka Application',
  }));



app.post('/api/v1/auth/signup', UsersController.signup);
}
export default routes;