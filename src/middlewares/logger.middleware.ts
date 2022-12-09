import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { diag } from '@opentelemetry/api';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction) {
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
      const { statusCode } = response;
      const message = `[REQ] ${method} ${originalUrl} ${statusCode} - ${userAgent} ${ip}`;
      diag.info(message);
    });

    next();
  }
}
