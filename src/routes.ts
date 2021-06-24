import { Router, Request, Response } from 'express';
import { CreateTagController } from './controllers/CreateTagController';
import { CreateUserController } from './controllers/CreateUserController';
import { syncWslAndWindowsDatabases } from './database/SyncWslAndWindowsDatabases';
import { asyncFunctionConcat } from './libs/asyncFunctionConcat';
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

// eslint-disable-next-line
router.post('/tags', ensureAdmin, createTagController.handle);

export { router };
