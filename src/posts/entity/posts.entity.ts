import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';

@Entity()
export class Posts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 120, nullable: true })
  public image: any;

  @Column({ type: 'varchar', length: 120, nullable: true })
  public header: string;

  @Column({ type: 'varchar', length: 120, nullable: true })
  public description: string;

  @Column({ type: 'varchar', length: 120, nullable: true })
  public comments: Array<string>;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  /*
   * Create and Update Date Columns
   */

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}
