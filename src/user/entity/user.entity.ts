import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  /*
   * Create and Update Date Columns
   */

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;
}
