import { Controller, Get, Param } from '@nestjs/common';
import { FilmService } from './film.service';

@Controller('ble/films')
export class FilmController {
  constructor(private readonly filmService: FilmService) {}

  @Get()
  async searchFilms(): Promise<any> {
    return this.filmService.searchFilms();
  }

  @Get('/:id')
  async getFilm(@Param('id') id: string): Promise<any> {
    return this.filmService.getFilm(id);
  }
}
