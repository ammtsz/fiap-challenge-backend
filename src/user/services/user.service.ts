import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  
  async create(user: CreateUserDto) {
    return this.userRepository.createUser(user);
  }

  async findOne(email: string) {
    return this.userRepository.getUser(email);
  }

  async update(email: string, user: UpdateUserDto) {
    return this.userRepository.updateUser(email, user);
  }

  async remove(email: string) {
    return this.userRepository.deleteUser(email);
  }
}
