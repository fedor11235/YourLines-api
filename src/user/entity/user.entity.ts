import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Posts } from '../../posts/entity/posts.entity';
import { Comments } from '../../posts/entity/comments.entity';

@Entity()
export class User {
  @PrimaryColumn({ type: 'varchar', length: 120 })
  public nickname: string;

  @Column({ type: 'varchar', length: 120, unique: true })
  public link: string;

  @Column({ type: 'varchar', length: 120, unique: true })
  public email: string;

  @Column({ type: 'varchar', length: 120 })
  public password: string;

  @Column({ type: 'varchar', length: 120, nullable: true })
  public description: string;

  @Column({ type: 'varchar', length: 120, nullable: true })
  public webSite: string;

  @Column({ type: 'varchar', length: 120, nullable: true })
  public wishList: string;

  @Column({ type: 'varchar', length: 120, nullable: true })
  public avatar: string;

  @Column({ type: 'varchar', length: 120, nullable: true })
  public headerImage: string;

  @OneToMany(() => Posts, (post) => post.user)
  posts: Posts[];

  @OneToMany(() => Comments, (comment) => comment.user)
  comment: Comments[];

  /*
   * Create and Update Date Columns
   */

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;
}
