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
      throw new BadRequestException('APP_KEY_REQUIRED');
    }

    next();
  }
}
