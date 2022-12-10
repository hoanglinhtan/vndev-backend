import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { register } from 'prom-client';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/metrics')
  async getMetrics(@Res() res) {
    try {
      res.set('Content-Type', register.contentType);
      res.end(await register.metrics());
    } catch (err) {
      res.status(500).end(err);
    }
  }
}
