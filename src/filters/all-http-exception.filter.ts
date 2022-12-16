import { ArgumentsHost, Catch, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(Error)
export class AllHttpExceptionFilter {
  private readonly logger = new Logger(AllHttpExceptionFilter.name);
  private readonly white_listed_urls = ['', '/favicon.ico'];

  catch(error: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const shouldUseLogging = !this.white_listed_urls.includes(request.baseUrl);
    if (shouldUseLogging) {
      this.logger.error(error);
    }

    if (error.response) {
      return response.status(error.getStatus()).json(error.response);
    }

    return response.status(error.getStatus()).json({
      statusCode: 500,
      message: 'INTERNAL_ERROR',
      error: 'Please contact admin.',
    });
  }
}
