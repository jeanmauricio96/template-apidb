import { Router } from 'express';
import cors from 'cors';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import ScrapController from './app/controllers/ScrapController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
routes.use(cors());

routes.post('/login', SessionController.store);
routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

routes.use(authMiddleware);
routes.put('/users', UserController.update);
routes.delete('/users/:id', UserController.delete);

routes.get('/scraps', ScrapController.index);
routes.post('/scraps', ScrapController.store);
routes.put('/scraps/:id', ScrapController.update);
routes.delete('/scraps/:id', ScrapController.delete);

export default routes;
