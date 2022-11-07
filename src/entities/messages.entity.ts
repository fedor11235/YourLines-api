import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Messages {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: true })
  public userId:  string

  @Column({ type: String, nullable: true })
  public roomId:  string


  @Column({ type: String, nullable: true })
  public nickname:  string

  @Column({ type: 'varchar', length: 120, nullable: true })
  public text: any;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;
}
