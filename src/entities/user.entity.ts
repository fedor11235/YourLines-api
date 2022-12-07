import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Posts } from './posts.entity';
import { Comments } from './comments.entity';
import { Bookmark } from './bookmark.entity';
import { Messages } from './messages.entity';
import { Notifications } from './notifications.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 120 })
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

  @Column({ type: 'bytea', nullable: true })
  public avatar: string;

  @Column({ type: 'bytea', nullable: true })
  public headerImage: string;

  @OneToMany(() => Posts, (post) => post.user)
  posts: Posts[];

  @OneToMany(() => Notifications, (notification) => notification.userTo)
  notifications: Notifications[];

  @OneToMany(() => Notifications, (actions) => actions.userFrom)
  actions: Notifications[];

  @OneToMany(() => Comments, (comment) => comment.user)
  comment: Comments[];

  @OneToMany(() => Bookmark, (bookmark) => bookmark.user)
  bookmark: Bookmark[];

  @OneToMany(() => Bookmark, (bookmark) => bookmark.usersPost)
  usersPost: Bookmark[];

  @OneToMany(() => Messages, (Messages) => Messages.userDialog)
  userDialog: Messages[];

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;
}
