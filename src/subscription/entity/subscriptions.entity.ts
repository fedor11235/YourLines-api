import { User } from '../../user/entity/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@Entity()
export class Subscriptions {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, { nullable: true })
  public user: User;

  @OneToOne(() => User, { nullable: true })
  public subscriptions: User;
}
