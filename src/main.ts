import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllHttpExceptionFilter } from './filters';
import { AppLogger } from './logger/applogger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new AppLogger(),
  });

  app.useGlobalFilters(new AllHttpExceptionFilter());

  await app.listen(process.env.PORT);
}

bootstrap();
