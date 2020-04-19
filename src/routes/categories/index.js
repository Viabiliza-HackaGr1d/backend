import { Router } from 'express';

import CategoryController from '../../app/controllers/CategoryController';
import { storeValidator, updateValidator } from '../../app/validators/Category';

const routes = new Router();

routes.post('/', storeValidator, CategoryController.store);
routes.put('/', updateValidator, CategoryController.update);

export default routes;
