import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Category } from './category.entity';
import { Explanation } from './explanations.entity';
import { MediaFile } from './media-file.entity';

@Entity({
  name: 'ble_films',
})
export class Film {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 20 })
  name: string;

  @Column({ type: 'uuid' })
  categoryId: string;

  @ManyToOne(() => Category, (category) => category.films)
  category: Category;

  @OneToMany(() => Explanation, (explanation) => explanation.film)
  explanations: Explanation[];

  @OneToMany(() => MediaFile, (mediaFile) => mediaFile.film)
  mediafiles: MediaFile[];
}
