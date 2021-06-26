import { classToPlain } from 'class-transformer';
import { getCustomRepository } from 'typeorm';
import { User } from '../entities/User';
import { UsersRepository } from '../repositories/UsersRepository';

class ListUserService {
  async execute(): Promise<User[]> {
    const usersRepository = getCustomRepository(UsersRepository);
    const users = await usersRepository.find();
    return classToPlain(users) as User[];
  }
}

export { ListUserService };
