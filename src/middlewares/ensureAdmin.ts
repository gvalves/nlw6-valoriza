import { Request, Response, NextFunction } from 'express';

// eslint-disable-next-line
const ensureAdmin = (req: Request, res: Response, next: NextFunction) => {
  const admin = true;

  if (admin) {
    return next();
  }

  return res.status(401).json({
    error: 'Unauthorized request',
  });
};

export { ensureAdmin };
