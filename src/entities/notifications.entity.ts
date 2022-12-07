import {
  Entity,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Notifications {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.actions)
  public userFrom: User;

  @ManyToOne(() => User, (user) => user.notifications)
  public userTo: User;

  @Column({ type: String, nullable: true })
  public type: string;

  @Column({ type: String, nullable: true })
  public info: string;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @Column({ type: Boolean, default: false })
  public viewed: boolean;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;
}
