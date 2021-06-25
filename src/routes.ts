import { Router, Request, Response } from 'express';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { CreateComplimentController } from './controllers/CreateComplimentController';
import { CreateTagController } from './controllers/CreateTagController';
import { CreateUserController } from './controllers/CreateUserController';
import { syncWslAndWinDatabaseWhenUsingWsl } from './database/syncWslAndWinDB';
import { ensureAdmin } from './middlewares/ensureAdmin';

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();

router.post('/users', (req: Request, res: Response) => {
  (async () => {
    await createUserController.handle(req, res);
    syncWslAndWinDatabaseWhenUsingWsl();
  })();
});

router.post('/tags', ensureAdmin, (req: Request, res: Response) => {
  (async () => {
    await createTagController.handle(req, res);
    syncWslAndWinDatabaseWhenUsingWsl();
  })();
});

router.post('/login', ensureAdmin, (req: Request, res: Response) => {
  (async () => {
    await authenticateUserController.handle(req, res);
  })();
});

router.post('/compliments', (req: Request, res: Response) => {
  (async () => {
    await createComplimentController.handle(req, res);
    syncWslAndWinDatabaseWhenUsingWsl();
  })();
});

export { router };
