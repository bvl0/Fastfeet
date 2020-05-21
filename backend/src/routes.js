import { Router } from 'express';
import UserController from './app/controllers/userController'
import SessionController from './app/controllers/sessionController'
import RecipientController from './app/controllers/recipientController'

import authMiddleware from './app/middlewares/auth'
const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.post('/recipients', RecipientController.store);


export default routes;
