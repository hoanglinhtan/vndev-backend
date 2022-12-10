/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoggerService } from '@nestjs/common';
import * as winston from 'winston';

export class AppLogger implements LoggerService {
  private readonly logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          dirname: 'logs',
          filename: 'error.log',
          level: 'error',
        }),
        new winston.transports.File({ dirname: 'logs', filename: 'vndev.log' }),
      ],
    });
  }

  log(message: any, ...optionalParams: any[]) {
    this.logger.info(message);
  }

  error(message: any, ...optionalParams: any[]) {
    this.logger.error(message);
  }

  warn(message: any, ...optionalParams: any[]) {
    this.logger.warn(message);
  }

  debug?(message: any, ...optionalParams: any[]) {
    this.logger.debug(message);
  }

  verbose?(message: any, ...optionalParams: any[]) {
    this.logger.verbose(message);
  }
}
