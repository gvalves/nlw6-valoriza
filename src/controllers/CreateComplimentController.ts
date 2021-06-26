import { Request, Response } from 'express';
import { CreateComplimentService } from '../services/CreateComplimentService';

interface ReqBody {
  user_receiver: string;
  tag_id: string;
  message: string;
}
class CreateComplimentController {
  async handle(req: Request, res: Response): Promise<Response> {
    // eslint-disable-next-line
    const { user_receiver, tag_id, message } = req.body as ReqBody;
    // eslint-disable-next-line
    const { user_id: user_sender } = req;

    const createComplimentService = new CreateComplimentService();

    const compliment = await createComplimentService.execute({
      user_sender,
      user_receiver,
      tag_id,
      message,
    });

    return res.json(compliment);
  }
}

export { CreateComplimentController };
