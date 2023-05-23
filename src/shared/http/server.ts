import 'reflect-metadata';
import '../typeorm';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import routes from './routes';
import AppError from './errors/AppError';

const app = express();

const hostname = 'localhost';
const port = 3333;

app.use(cors());
app.use(express.json());

app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

app.listen(port, hostname, () => {
  console.log(
    '\x1b[33m%s\x1b[0m',
    `Server running on http://${hostname}:${port} 🥳`,
  );
});
