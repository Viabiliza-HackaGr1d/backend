import { Router } from 'express';

import AssuranceController from '../../app/controllers/AssuranceController';
import { storeValidator, updateValidator, deleteValidator } from '../../app/validators/Assurance';

const routes = new Router();

routes.post('/', storeValidator, AssuranceController.store);
routes.put('/', updateValidator, AssuranceController.update);
routes.delete('/', deleteValidator, AssuranceController.delete);

export default routes;
