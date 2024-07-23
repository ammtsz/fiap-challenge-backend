import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IUser } from "./models/user.interface";
import { Post } from "../../posts/entities/posts.entity";

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn('increment', { name: 'id'})
  id?: number

  @Column({
    type: 'varchar',
  })
  username: string;
  
  @Column({
    type: 'varchar',
  })
  email: string;
  
  @Column({
    type: 'varchar',
  })
  password: string;
  
  @Column({
    type: 'varchar',
    enum: ['teacher', 'student']
  })
  role: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
