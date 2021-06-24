import { Request, Response } from 'express';
import { SyncWslAndWindowsDatabases } from '../database/SyncWslAndWindowsDatabases';
import { CreateUserService } from '../services/CreateUserService';

class CreateUserController {
  @SyncWslAndWindowsDatabases
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, admin } = req.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({ name, email, admin });

    return res.json(user);
  }
}

export { CreateUserController };
