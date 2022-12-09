import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './films/category.entity';
import { Explanation } from './films/explanations.entity';
import { FilmController } from './films/film.controller';
import { Film } from './films/film.entity';
import { FilmService } from './films/film.service';
import { MediaFile } from './films/media-file.entity';
import { ApiKeyMiddleware } from './middlewares/apikey.middleware';

/**
 * Blockbuster Explain App: BLE
 */
@Module({
  imports: [TypeOrmModule.forFeature([Category, Film, Explanation, MediaFile])],
  controllers: [FilmController],
  providers: [FilmService],
})
export class BlockbustersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiKeyMiddleware).forRoutes('*');
  }
}
