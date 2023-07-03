import 'reflect-metadata';
import '@shared/container';
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

// Server config
const hostname = process.env.SERVER_HOSTNAME || 'localhost';
const port = process.env.SERVER_PORT
  ? parseFloat(process.env.SERVER_PORT)
  : 3333;

// Middlewares
app.use(cors()); // Enable CORS
app.use(express.json()); // Allows the use of JSON in requests
app.use(expressStatusMonitor()); // Add an Express Status Monitor
app.use(rateLimiter as RequestHandler); // Request rate control middleware
app.use(pagination); // Pagination middleware using TypeORM
app.use('/avatar', express.static(uploadConfig.directory)); // Define the '/avatar' route to serve static files from the upload directory
app.use(routes); // Add the routes defined in the 'routes' file
app.use(errors()); // Error handling middleware for data validation using the 'celebrate' package

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
});

// Server startup
app.listen(port, hostname, () => {
  // Break the app if the required variables are missing
  const requiredEnvVariables = [
    'APP_WEB_URL',
    'JWT_SECRET_KEY',
    'MAIL_DRIVER',
    'STORAGE_DRIVER',
    'AVATAR_BASE_URL',
  ];

  const missingEnvVariables = requiredEnvVariables.filter(
    variable => !process.env[variable],
  );

  if (missingEnvVariables.length > 0) {
    throw new AppError('Check the required environment variables!', 500);
  }

  console.log(
    '\x1b[33m%s\x1b[0m',
    `Server running on http://${hostname}:${port} 🥳`,
  );
});
