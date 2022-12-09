import {
  Injectable,
  InternalServerErrorException,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { diag } from '@opentelemetry/api';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.headers['api-key'] !== process.env.API_KEY) {
      diag.error(`[API_KEY_REQUIRED] URL ${req.url}`);
      throw new InternalServerErrorException('API_KEY_REQUIRED');
    }

    next();
  }
}
