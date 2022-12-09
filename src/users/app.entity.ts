import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Application {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 100 })
  url: string;
}
