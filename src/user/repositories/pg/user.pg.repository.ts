import { IUser } from "../../../user/entities/models/user.interface";
import { UserRepository } from "../user.repository";
import { User } from "../../../user/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "../../../user/dto/create-user.dto";
import { UpdateUserDto } from "../../../user/dto/update-user.dto";

export class UserPGRepository implements UserRepository {
  constructor(
    @InjectRepository(User) private userModel: Repository<User>
  ){}

  async getUser(email: string): Promise<IUser> {
    return this.userModel.findOne({ where: { email }})
  }
  async createUser(user: CreateUserDto): Promise<void> {
    await this.userModel.save(user)
  }
  async updateUser(email: string, user: UpdateUserDto): Promise<void> {
    await this.userModel.update({ email }, user)
  }
  async deleteUser(email: string): Promise<void> {
    await this.userModel.delete({ email })
  }
}