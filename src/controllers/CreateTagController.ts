import { Request, Response } from 'express';
import { CreateTagService } from '../services/CreateTagService';

interface ReqBody {
  name: string;
}
class CreateTagController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name } = req.body as ReqBody;

    const createTagService = new CreateTagService();

    const tag = await createTagService.execute(name);

    return res.json(tag);
  }
}

export { CreateTagController };
