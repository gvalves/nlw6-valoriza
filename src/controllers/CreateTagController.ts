import { Request, Response } from 'express';
import { SyncWslAndWindowsDatabases } from '../database/SyncWslAndWindowsDatabases';
import { CreateTagService } from '../services/CreateTagService';

class CreateTagController {
  @SyncWslAndWindowsDatabases
  async handle(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;

    const createTagService = new CreateTagService();

    const tag = await createTagService.execute(name as string);

    return res.json(tag);
  }
}

export { CreateTagController };
