import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Film } from '../films/film.entity';

@Entity({
  name: 'ble_mediafiles',
})
export class MediaFile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 10 })
  type: string;

  @Column({ length: 100 })
  url: string;

  @Column({ type: 'uuid' })
  filmId: string;

  @ManyToOne(() => Film, (film) => film.explanations)
  film: Film;
}
