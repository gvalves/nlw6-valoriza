import { getCustomRepository } from 'typeorm';
import { Compliment } from '../entities/Compliment';
import { CustomError } from '../errors/CustomError';
import { ComplimentsRepository } from '../repositories/ComplimentsRepository';
import { UsersRepository } from '../repositories/UsersRepository';

interface IComplimentRequest {
  user_sender: string;
  user_receiver: string;
  tag_id: string;
  message: string;
}

class CreateComplimentService {
  async execute({
    user_sender,
    user_receiver,
    tag_id,
    message,
  }: IComplimentRequest): Promise<Compliment> {
    const complimentsRepository = getCustomRepository(ComplimentsRepository);
    const usersRepository = getCustomRepository(UsersRepository);

    if (user_sender === user_receiver) {
      throw new CustomError('User cannot self compliment', 400);
    }

    const userReceiverExists = await usersRepository.findOne(user_receiver);

    if (!userReceiverExists) {
      throw new CustomError("User receiver doesn't exists", 404);
    }

    const compliment = complimentsRepository.create({
      user_sender,
      user_receiver,
      tag_id,
      message,
    });

    await complimentsRepository.save(compliment);

    return compliment;
  }
}

export { CreateComplimentService };
