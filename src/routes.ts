import { Router } from 'express';
import { updateDatabase } from './database/updateDatabase';
import { CreateUserController } from './controllers/CreateUserController';

const router = Router();

const createUserController = new CreateUserController();

router.post('/users', (req, res) => {
  (async () => {
    await createUserController.handle(req, res);
    updateDatabase();
  })();
});

export { router };
