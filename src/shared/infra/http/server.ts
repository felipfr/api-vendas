import 'reflect-metadata';
import '@shared/infra/typeorm';
import 'dotenv/config';
import 'express-async-errors';
import AppError from './errors/AppError';
import cors from 'cors';
import express, {
  NextFunction,
  Request,
  Response,
  RequestHandler,
} from 'express';
import expressStatusMonitor from 'express-status-monitor';
import rateLimiter from '@shared/infra/http/middlewares/rateLimiter';
import routes from './routes';
import uploadConfig from '@config/upload';
import { errors } from 'celebrate';
import { pagination } from 'typeorm-pagination';

const app = express();

const hostname = process.env.SERVER_HOSTNAME || 'localhost';
const port = process.env.SERVER_PORT
  ? parseFloat(process.env.SERVER_PORT)
  : 3333;

app.use(cors());
app.use(express.json());
app.use(expressStatusMonitor());
app.use(rateLimiter as RequestHandler);
app.use(pagination);
app.use('/avatar', express.static(uploadConfig.directory));
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
  // break the app if the required variables are missing
  if (
    !process.env.APP_WEB_URL ||
    !process.env.JWT_SECRET_KEY ||
    !process.env.MAIL_DRIVER ||
    !process.env.STORAGE_DRIVER ||
    !process.env.AVATAR_BASE_URL
  ) {
    throw new AppError('Check the required environment variables!', 500);
  }

  console.log(
    '\x1b[33m%s\x1b[0m',
    `Server running on http://${hostname}:${port} 🥳`,
  );
});
