import { Request, Response } from 'express';
import { ListUserReceivedComplimentsService } from '../services/ListUserReceivedComplimentsService';

class ListUserReceivedComplimentsController {
  async handle(req: Request, res: Response): Promise<Response> {
    // eslint-disable-next-line
    const { user_id } = req;

    const listUserReceivedComplimentsService = new ListUserReceivedComplimentsService();

    const compliments = await listUserReceivedComplimentsService.execute(user_id);

    return res.json(compliments);
  }
}

export { ListUserReceivedComplimentsController };
