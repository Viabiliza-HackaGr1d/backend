import { Router } from 'express';

import CustomerController from '../../app/controllers/CustomerController';
import SessionController from '../../app/controllers/auth/customer/SessionController';

import validateCustomerStore from '../../app/validators/CustomerStore';
import validateCustomerUpdate from '../../app/validators/CustomerUpdate';

import authMiddleware from '../../app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.post('/', validateCustomerStore, CustomerController.store);
routes.put(
  '/:id',
  authMiddleware('customer'),
  validateCustomerUpdate,
  CustomerController.update
);

export default routes;
