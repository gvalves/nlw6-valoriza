import { Request, Response } from 'express';
import { AuthenticateUserService } from '../services/AuthenticateUserService';

class AuthenticateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const createTagService = new AuthenticateUserService();

    const token = await createTagService.execute({ email, password });

    return res.json(token);
  }
}

export { AuthenticateUserController };
