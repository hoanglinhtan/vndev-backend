import {
  Injectable,
  InternalServerErrorException,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { diag } from '@opentelemetry/api';

@Injectable()
export class AppKeyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.headers['app-key'] !== 'ble') {
      diag.error(`[APP_KEY_REQUIRED] ${req.method} ${req.url} ${req.ip} `);
      throw new InternalServerErrorException('APP_KEY_REQUIRED');
    }

    next();
  }
}
