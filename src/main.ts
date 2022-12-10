import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppLogger } from './logger/applogger.service';
import { collectDefaultMetrics } from 'prom-client';

async function bootstrap() {
  collectDefaultMetrics();

  const app = await NestFactory.create(AppModule, {
    logger: new AppLogger(),
  });

  await app.listen(process.env.PORT);
}

bootstrap();
