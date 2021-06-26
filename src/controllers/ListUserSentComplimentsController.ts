import { Request, Response } from 'express';
import { ListUserSentComplimentsService } from '../services/ListUserSentComplimentsService';

class ListUserSentComplimentsController {
  async handle(req: Request, res: Response): Promise<Response> {
    // eslint-disable-next-line
    const { user_id } = req;

    const listUserSentComplimentsService = new ListUserSentComplimentsService();

    const compliments = await listUserSentComplimentsService.execute(user_id);

    return res.json(compliments);
  }
}

export { ListUserSentComplimentsController };
