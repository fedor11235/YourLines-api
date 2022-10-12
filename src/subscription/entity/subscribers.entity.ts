import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Subscribers {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column({ type: 'varchar', length: 120 })
  public idUser: string;

  @Column({ type: 'varchar', length: 120 })
  public subscribers: string;
}
