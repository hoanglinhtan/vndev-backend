import { Module } from '@nestjs/common';
import { MyLogger } from './mylogger.service';

@Module({
  providers: [MyLogger],
  exports: [MyLogger],
})
export class LoggerModule {}
