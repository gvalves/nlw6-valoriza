import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import { User } from '../entities/User';
import { UsersRepository } from '../repositories/UsersRepository';
import { CustomError } from '../errors/CustomError';

interface IUserInterface {
  name: string;
  email: string;
  admin?: boolean;
  password: string;
}

class CreateUserService {
  async execute({ name, email, admin = false, password }: IUserInterface): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    if (!email) {
      throw new CustomError('User email cannot be empty', 400);
    }

    const userAlreadyExists = await usersRepository.findOne({
      where: { email },
    });

    if (userAlreadyExists) {
      throw new CustomError('User already exists', 400);
    }

    const passwordHash = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      admin,
      password: passwordHash,
    });

    await usersRepository.save(user);

    return user;
  }
}

export { CreateUserService };
