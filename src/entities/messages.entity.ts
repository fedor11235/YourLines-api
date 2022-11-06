import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Messages {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 120, nullable: true })
  public text: any;

  @Column({ type: 'uuid', nullable: true })
  public userId:  string

  //????????????????
  @ManyToOne(() => User, (user) => user.sender)
  user: User;

  @ManyToOne(() => User, (user) => user.recipient)
  recipient: User;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;
}
