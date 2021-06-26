import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { jwtSecretKey } from '../constants';

interface IPayload extends JwtPayload {
  sub: string;
}

export const ensureAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
  const authToken = req.headers.authorization as string;

  if (!authToken) {
    return res.status(401).end();
  }

  const [, token] = authToken.split(' ');

  try {
    const { sub } = verify(token, jwtSecretKey) as IPayload;
    req.user_id = sub;
    return next();
  } catch (err) {
    return res.status(401).end();
  }
};
