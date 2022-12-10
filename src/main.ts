import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppLogger } from './logger/applogger.service';
import tracer from './monitoring/tracer';

async function bootstrap() {
  await tracer.start();

  const app = await NestFactory.create(AppModule, {
    logger: new AppLogger(),
  });
  await app.listen(process.env.PORT);
}
bootstrap();
