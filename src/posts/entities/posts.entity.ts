import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IPost } from "./models/posts.interface";
import { User } from "src/user/entities/user.entity";

@Entity()
export class Post implements IPost {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
  })
  title: string;

  @Column({
    type: 'text',
    nullable: true
  })
  content: string;

  @Column({
    type: 'timestamp'
  })
  date: Date;

  @ManyToOne(() => User, user => user.posts)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
