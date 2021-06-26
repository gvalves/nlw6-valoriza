import { Request, Response } from 'express';
import { CreateUserService } from '../services/CreateUserService';

interface ReqBody {
  name: string;
  email: string;
  admin: boolean;
  password: string;
}
class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, admin, password } = req.body as ReqBody;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({ name, email, admin, password });

    return res.json(user);
  }
}

export { CreateUserController };
