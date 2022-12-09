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
      this.logger.error(
        `[APP_KEY_REQUIRED] ${req.method} ${req.url} ${req.ip} `,
      );
      throw new BadRequestException('API_KEY_REQUIRED');
    }

    next();
  }
}
