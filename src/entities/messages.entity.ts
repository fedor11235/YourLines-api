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

  @Column({ type: 'uuid', nullable: true })
  public userId: string;

  @Column({ type: String, nullable: true })
  public roomId: string;

  @Column({ type: String, nullable: true })
  public nickname: string;

  @ManyToOne(() => User, (user) => user.userDialog)
  public userDialog: User;

  @Column({ type: 'varchar', length: 120, nullable: true })
  public text: any;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;
}
