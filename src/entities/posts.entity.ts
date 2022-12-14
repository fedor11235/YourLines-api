import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Comments } from './comments.entity';
import { Bookmark } from './bookmark.entity';

@Entity()
export class Posts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'bytea', nullable: true })
  public image: any;

  @Column({ type: 'varchar', length: 120, nullable: true })
  public header: string;

  @Column({ type: 'varchar', length: 120, nullable: true })
  public description: string;

  @Column({ type: 'int', nullable: true })
  public likes: number;

  @Column({ type: 'varchar', length: 120, nullable: true })
  public comments: Array<string>;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @OneToMany(() => Comments, (comment) => comment.post)
  comment: Comments[];

  @OneToMany(() => Bookmark, (bookmark) => bookmark.post)
  bookmark: Bookmark[];

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;
}
