import { Router } from 'express';

import BrokerController from '../../app/controllers/BrokerController';
import SessionController from '../../app/controllers/auth/broker/SessionController';
import BrokerDashboardController from '../../app/controllers/BrokerDashboardController';

import validateBrokerStore from '../../app/validators/BrokerStore';
import validateBrokerUpdate from '../../app/validators/BrokerUpdate';

import authMiddleware from '../../app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.post('/', validateBrokerStore, BrokerController.store);

routes.put(
  '/:id',
  validateBrokerUpdate,
  authMiddleware('broker'),
  BrokerController.update
);

routes.get('/', authMiddleware('broker'), BrokerController.index);
routes.get(
  '/:id/dashboard',
  authMiddleware('broker'),
  BrokerDashboardController.index
);

export default routes;
