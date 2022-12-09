import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Film } from '../films/film.entity';

@Entity({
  name: 'ble_explanations',
})
export class Explanation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'uuid' })
  filmId: string;

  @ManyToOne(() => Film, (film) => film.explanations)
  film: Film;
}
