import { Router } from 'express';

import customers from './customers';
import brokers from './brokers';
import categories from './categories';
import assurances from './assurances';

const routes = new Router();

routes.use('/customers', customers);
routes.use('/brokers', brokers);

routes.use('/categories', categories);

routes.use('/assurances', assurances);

export default routes;
