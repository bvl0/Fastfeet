import { Router } from 'express';
import multer from 'multer';
import multerconfig from './config/multer';

import UserController from './app/controllers/userController'
import SessionController from './app/controllers/sessionController'
import RecipientController from './app/controllers/recipientController'
import DeliverymanController from './app/controllers/deliverymanController';
import FileController from './app/controllers/fileController';
import OrderController from './app/controllers/orderContorller';
import WithdrawController from './app/controllers/withdrawController';

import authMiddleware from './app/middlewares/auth'
const routes = new Router();
const upload = multer(multerconfig);
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.post('/recipients', RecipientController.store);
routes.post('/files',upload.single('file'), FileController.store);

routes.post('/deliveryman', DeliverymanController.store);
routes.put('/update/:id', DeliverymanController.update);
routes.get('/deliveryman', DeliverymanController.index);
routes.delete('/delete/:id', DeliverymanController.delete);

routes.post('/order',OrderController.store);
routes.get('/order/:id', OrderController.index);
routes.delete('/order/:id', OrderController.delete);

routes.put('/order/status/:id', WithdrawController.update);

export default routes;
