import { Router } from 'express';

import CategoryController from '../../app/controllers/CategoryController';
import { updateValidator } from '../../app/validators/Category';

const routes = new Router();

routes.post('/', updateValidator, CategoryController.store);
routes.put('/', updateValidator, CategoryController.update);

export default routes;
