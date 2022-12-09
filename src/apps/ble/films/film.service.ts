import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Film } from './film.entity';

@Injectable()
export class FilmService {
  constructor(private dataSource: DataSource) {}

  async searchFilms(): Promise<any> {
    const films = await this.dataSource
      .getRepository(Film)
      .createQueryBuilder('film')
      .leftJoinAndSelect('film.mediafiles', 'mediafiles')
      .getMany();
    return {
      data: films,
    };
  }

  async getFilm(id: string): Promise<any> {
    const film = await this.dataSource
      .getRepository(Film)
      .createQueryBuilder('film')
      .leftJoinAndSelect('film.mediafiles', 'mediafiles')
      .where('film.id = :id', { id })
      .getOne();
    return {
      data: film,
    };
  }
}
