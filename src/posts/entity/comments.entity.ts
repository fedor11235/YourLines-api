import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { Posts } from './posts.entity';

@Entity()
export class Comments {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 120, nullable: true })
  public text: any;

  @Column({ type: 'int', nullable: true })
  public likes: any;

  @Column({ type: 'int', nullable: true })
  public view: any;

  @ManyToOne(() => User, (user) => user.comment)
  user: User;

  @ManyToOne(() => Posts, (post) => post.comment)
  post: Posts;

  /*
   * Create and Update Date Columns
   */

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}
