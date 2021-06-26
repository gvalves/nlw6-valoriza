import 'reflect-metadata';
import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';

import './database/connection';

import { router } from './routes';
import { isCustomError } from './errors/CustomError';

const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());

app.use(router);

// eslint-disable-next-line
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (isCustomError(err)) {
    return res.status(err.code).json({ error: err.message });
  }
  return res.status(500).json({
    status: 'Error',
    message: 'Internal Server Error',
  });
});

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
