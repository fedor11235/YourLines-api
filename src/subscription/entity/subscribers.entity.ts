import { User } from '../../user/entity/user.entity';
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

  @OneToOne(() => User, { nullable: true })
  public user: User;

  @OneToOne(() => User, { nullable: true })
  public subscribers: User;
}
