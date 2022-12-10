import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppLogger } from './logger/applogger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new AppLogger(),
  });
  await app.listen(process.env.PORT);
}
bootstrap();
