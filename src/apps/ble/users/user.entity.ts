import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'ble_users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 20 })
  username: string;

  @Column({ length: 50 })
  password: string;

  @Column({ length: 50 })
  firstName: string;

  @Column({ length: 50 })
  lastName: string;

  @Column({ default: true })
  isActive: boolean;
}
