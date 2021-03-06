import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import { jwtSecretKey } from '../constants';
import { CustomError } from '../errors/CustomError';
import { UsersRepository } from '../repositories/UsersRepository';

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest): Promise<string> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new CustomError('Email/Password incorrect', 400);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new CustomError('Email/Password incorrect', 400);
    }

    const token = sign({ email }, jwtSecretKey, {
      subject: user.id,
      expiresIn: '1d',
    });

    return token;
  }
}

export { AuthenticateUserService };
