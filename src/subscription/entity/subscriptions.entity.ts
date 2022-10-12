import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Subscriptions {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column({ type: 'varchar', length: 120 })
  public idUser: string;

  @Column({ type: 'varchar', length: 120 })
  public subscriptions: string;
}
