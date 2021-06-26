import { Router, Request, Response, RequestHandler } from 'express';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { CreateComplimentController } from './controllers/CreateComplimentController';
import { CreateTagController } from './controllers/CreateTagController';
import { CreateUserController } from './controllers/CreateUserController';
import { ListTagController } from './controllers/ListTagController';
import { ListUserController } from './controllers/ListUserController';
import { ListUserReceivedComplimentsController } from './controllers/ListUserReceivedComplimentsController';
import { ListUserSentComplimentsController } from './controllers/ListUserSentComplimentsController';
import { syncWslAndWinDatabaseWhenUsingWsl } from './database/syncWslAndWinDB';
import { ensureAdmin } from './middlewares/ensureAdmin';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';

interface Controller {
  handle(req: Request, res: Response): Promise<Response>;
}

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserReceivedComplimentsController = new ListUserReceivedComplimentsController();
const listUserSentComplimentsController = new ListUserSentComplimentsController();
const listTagController = new ListTagController();
const listUserController = new ListUserController();

const handleController = (controller: Controller): RequestHandler => {
  return async (req: Request, res: Response) => {
    await controller.handle(req, res);
    syncWslAndWinDatabaseWhenUsingWsl();
  };
};

router.post('/users', handleController(createUserController));

router.post('/tags', ensureAuthenticated, ensureAdmin, handleController(createTagController));

router.post('/login', handleController(authenticateUserController));

router.post('/compliments', ensureAuthenticated, handleController(createComplimentController));

router.get(
  '/compliments/received',
  ensureAuthenticated,
  handleController(listUserReceivedComplimentsController)
);

router.get(
  '/compliments/sent',
  ensureAuthenticated,
  handleController(listUserSentComplimentsController)
);

router.get('/tags', ensureAuthenticated, handleController(listTagController));

router.get('/users', ensureAuthenticated, handleController(listUserController));

export { router };
