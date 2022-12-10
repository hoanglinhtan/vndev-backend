/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import { SentryService } from '@ntegral/nestjs-sentry';

export class AppLogger implements LoggerService {
  private readonly winstonLogger: winston.Logger;
  private readonly sentryLogger: SentryService;

  constructor() {
    const { format, transports, createLogger } = winston;

    this.winstonLogger = createLogger({
      level: 'info',
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD,HH:mm:ss ZZ',
          alias: 'time',
        }),
        format.json(),
      ),
      transports: [
        new transports.Console({
          format: format.json(),
        }),
        new transports.File({
          dirname: 'logs',
          filename: 'error.log',
          level: 'error',
        }),
        new transports.File({ dirname: 'logs', filename: 'vndev.log' }),
      ],
    });

    this.sentryLogger = SentryService.SentryServiceInstance();
  }

  log(message: any, ...optionalParams: any[]) {
    this.winstonLogger.info(message);
  }

  error(message: any, ...optionalParams: any[]) {
    this.winstonLogger.error(message);
    this.sentryLogger.error(message);
  }

  warn(message: any, ...optionalParams: any[]) {
    this.winstonLogger.warn(message);
  }

  debug?(message: any, ...optionalParams: any[]) {
    this.winstonLogger.debug(message);
  }

  verbose?(message: any, ...optionalParams: any[]) {
    this.winstonLogger.verbose(message);
  }
}
