import { Request, Response, NextFunction } from 'express';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import { ResponseError } from '@shared/errors/ResponseError';

const limiter = new RateLimiterMemory({
  keyPrefix: 'ratelimit',
  points: 5, // número máximo de requisições
  duration: 1, // por segundo
});

export async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await limiter.consume(request.ip as string);
    next();
  } catch {
    throw new ResponseError('Too many requests.', 429);
  }
}
