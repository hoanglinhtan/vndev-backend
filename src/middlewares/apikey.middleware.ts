import {
  BadRequestException,
  Injectable,
  Logger,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  private readonly logger = new Logger(ApiKeyMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    if (req.headers['api-key'] !== process.env.API_KEY) {
      this.logger.error(`[API_KEY_REQUIRED] ${req.method} ${req.ip} `);
      throw new BadRequestException('API_KEY_REQUIRED');
    }

    next();
  }
}
