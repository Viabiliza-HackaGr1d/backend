import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

const upload = multer(multerConfig);

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';

import validateSessionStore from './app/validators/SessionStore';
import validateUserStore from './app/validators/UserStore';
import validateUserUpdate from './app/validators/UserUpdate';

const routes = new Router();

routes.get('/', (req, res) => res.json('Hello World'));

routes.post('/sessions', validateSessionStore, SessionController.store);
routes.post('/users', validateUserStore, UserController.store);
routes.post('/users', validateUserUpdate, UserController.update);

export default routes;
