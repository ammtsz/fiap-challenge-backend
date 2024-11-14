import { Role } from 'src/shared/enums/role.enum';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { IUser } from '../entities/models/user.interface';

export abstract class UserRepository {
  abstract getUser(email: string): Promise<IUser>;
  abstract getUsers(): Promise<IUser[]>;
  abstract getUsersByRole(role: Role): Promise<IUser[]>;
  abstract createUser(user: CreateUserDto): Promise<void>;
  abstract updateUser(email: string, user: UpdateUserDto): Promise<void>;
  abstract deleteUser(email: string): Promise<void>;
}
