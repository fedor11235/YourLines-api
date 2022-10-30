import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Subscribers {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  public user: string;

  @Column({ nullable: true })
  public subscriptions: string;
}
