// import { User } from '../../user/entity/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
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
