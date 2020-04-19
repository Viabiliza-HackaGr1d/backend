import { Router } from 'express';

import customers from './customers';
import brokers from './brokers';

const routes = new Router();

routes.use('/customers', customers);
routes.use('/brokers', brokers);

export default routes;
