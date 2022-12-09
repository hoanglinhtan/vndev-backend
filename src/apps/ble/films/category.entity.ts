import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Film } from '../films/film.entity';

@Entity({
  name: 'ble_categories',
})
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 20 })
  name: string;

  @OneToMany(() => Film, (film) => film.category)
  films: Film[];
}
