import {
  BadRequestException,
  Injectable,
  Logger,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AppKeyMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AppKeyMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    if (req.headers['app-key'] !== 'ble') {
      this.logger.error(
        `[APP_KEY_REQUIRED] ${req.method} ${req.url} ${req.ip} `,
      );
      throw new BadRequestException('APP_KEY_REQUIRED');
    }

    next();
  }
}
