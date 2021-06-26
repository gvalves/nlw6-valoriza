import 'reflect-metadata';
import express, { Request, Response } from 'express';
import 'express-async-errors';

import './database/connection';

import { router } from './routes';

const app = express();
const port = 3000;

app.use(express.json());

app.use(router);

app.use((err: Error, req: Request, res: Response) => {
  if (err instanceof Error) {
    return res.status(400).json({ error: err.message });
  }
  return res.status(500).json({
    status: 'Error',
    message: 'Internal Server Error',
  });
});

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
