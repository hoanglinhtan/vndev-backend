import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import tracer from './monitoring/tracer';

async function bootstrap() {
  await tracer.start();

  const app = await NestFactory.create(AppModule);
  await app.listen(5000);
}
bootstrap();
