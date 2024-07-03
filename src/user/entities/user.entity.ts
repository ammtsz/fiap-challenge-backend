import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IUser } from "./models/user.interface";

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn('increment', { name: 'id'})
  id?: number

  @Column({
    name: 'username',
    type: 'varchar',
  })
  username: string;
  
  @Column({
    name: 'email',
    type: 'varchar',
  })
  email: string;
  
  @Column({
    name: 'password',
    type: 'varchar',
  })
  password: string;
  
  @Column({
    name: 'role',
    type: 'varchar',
    enum: ['teacher', 'student']
  })
  role: string;
}
