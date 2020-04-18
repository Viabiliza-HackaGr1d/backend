import { Router } from 'express';

import customers from './customers';

const routes = new Router();

routes.use('/customers', customers);

export default routes;
