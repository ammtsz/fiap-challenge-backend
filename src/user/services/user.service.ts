import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserRepository } from '../repositories/user.repository';
import { Role } from 'src/shared/enums/role.enum';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  
  async create(user: CreateUserDto) {
    return this.userRepository.createUser(user);
  }

  async findOne(email: string) {
    return this.userRepository.getUser(email);
  }

  async getUsers() {
    return this.userRepository.getUsers();
  }

  async getUsersByRole(role: Role) {
    return this.userRepository.getUsersByRole(role);
  }

  async update(email: string, user: UpdateUserDto) {
    return this.userRepository.updateUser(email, user);
  }

  async remove(email: string) {
    return this.userRepository.deleteUser(email);
  }
}
