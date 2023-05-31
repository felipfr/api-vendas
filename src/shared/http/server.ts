import '../typeorm';
import 'express-async-errors';
import 'reflect-metadata';
import AppError from './errors/AppError';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import expressStatusMonitor from 'express-status-monitor';
import routes from './routes';
import uploadConfig from '@config/upload';
import { errors } from 'celebrate';

const app = express();

const hostname = 'localhost';
const port = 3333;

app.use(cors());
app.use(express.json());
app.use(expressStatusMonitor());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);
app.use(errors());

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
