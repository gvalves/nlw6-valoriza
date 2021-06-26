import { Request, Response, NextFunction } from 'express';
import { getCustomRepository } from 'typeorm';
import { User } from '../entities/User';
import { UsersRepository } from '../repositories/UsersRepository';

const ensureAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  // eslint-disable-next-line
  const { user_id } = req;
  const usersRepository = getCustomRepository(UsersRepository);
  const { admin } = (await usersRepository.findOne(user_id)) as User;

  if (admin) {
    return next();
  }

  return res.status(401).json({
    error: 'Unauthorized request',
  });
};

export { ensureAdmin };
