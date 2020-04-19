import { Router } from 'express';

import AssuranceController from '../../app/controllers/AssuranceController';
// Needs a validator

const routes = new Router();

routes.post('/', AssuranceController.store);
routes.put('/', AssuranceController.update);
routes.delete('/', AssuranceController.delete);

export default routes;
