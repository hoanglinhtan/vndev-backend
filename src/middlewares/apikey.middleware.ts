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
      diag.error(`[APP_KEY_REQUIRED] ${req.method} ${req.url} ${req.ip} `);
      throw new InternalServerErrorException('API_KEY_REQUIRED');
    }

    next();
  }
}
