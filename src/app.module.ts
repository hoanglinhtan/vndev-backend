import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BestQuotesModule, BlockbustersModule } from './apps';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { ApiKeyMiddleware } from './middlewares/apikey.middleware';
import { SentryModule } from '@ntegral/nestjs-sentry';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: parseInt(configService.get<string>('DATABASE_PORT')),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASS'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        // only use this for development, please use migrations for production
        synchronize: true,
        logging: true,
      }),
      inject: [ConfigService],
    }),
    SentryModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dsn: configService.get<string>('SENTRY_DSN'),
        debug: false,
        environment: configService.get<string>('NODE_ENV'),
        release: `vndev@${process.env.npm_package_version}`,
        logLevels: ['error'],
        timestamp: true,
        enabled: !['localhost', 'development'].includes(
          configService.get<string>('NODE_ENV'),
        ),
      }),
      inject: [ConfigService],
    }),
    BlockbustersModule,
    BestQuotesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware, ApiKeyMiddleware).forRoutes('*');
  }
}
