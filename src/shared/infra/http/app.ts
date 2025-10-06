import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import { ResponseError } from '@shared/errors/ResponseError';
import { routes } from './routes';
import { rateLimiter } from './middlewares/rateLimiter';

const app = express();
app.use(cors());
app.use(express.json());
app.use(rateLimiter);
app.use('/api', routes);
app.use(errors());

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof ResponseError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    // eslint-disable-next-line no-console
    console.log(error);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
    next();
  },
);

export { app };
