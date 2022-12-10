/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoggerService } from '@nestjs/common';
import * as winston from 'winston';

export class AppLogger implements LoggerService {
  private readonly logger: winston.Logger;

  constructor() {
    const { format, transports, createLogger } = winston;
    this.logger = createLogger({
      level: 'info',
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD,HH:mm:ss ZZ',
          alias: 'time',
        }),
        format.json(),
      ),
      transports: [
        new transports.Console(),
        new transports.File({
          dirname: 'logs',
          filename: 'error.log',
          level: 'error',
        }),
        new transports.File({ dirname: 'logs', filename: 'vndev.log' }),
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
