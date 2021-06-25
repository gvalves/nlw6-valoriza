import { Router, Request, Response } from 'express';
import { CreateTagController } from './controllers/CreateTagController';
import { CreateUserController } from './controllers/CreateUserController';
import { syncWslAndWindowsDatabases } from './database/syncWslAndWindowsDatabases';
import { ensureAdmin } from './middlewares/ensureAdmin';

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();

router.post('/users', (req: Request, res: Response) => {
  (async () => {
    await createUserController.handle(req, res);
    syncWslAndWindowsDatabases();
  })();
});

router.post('/tags', ensureAdmin, (req: Request, res: Response) => {
  (async () => {
    await createTagController.handle(req, res);
    syncWslAndWindowsDatabases();
  })();
});

export { router };
