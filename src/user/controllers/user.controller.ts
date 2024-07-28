import { CreateUserDto } from 'src/user/dto/create-user.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { DuplicateRecordException } from 'src/filters/duplicate-record-exception.filter';
import { NotFoundError } from 'rxjs';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() user: CreateUserDto) {
    const isDuplicatedUser = await this.userService.findOne(user.email);
    if (!isDuplicatedUser && user) {
      this.userService.create(user);
      return 'Usuário criado com sucesso!';
    } else if (user && isDuplicatedUser) {
      throw new DuplicateRecordException();
    } else {
      throw new InternalServerErrorException();
    }
  }

  @Get()
  async findOne(@Query('email') email: string) {
    const user = await this.userService.findOne(email);
    if (user) {
      return user;
    } else {
      throw new NotFoundException();
    }
  }

  @Patch()
  async update(
    @Query('email') email: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    if ((await this.userService.findOne(email)) && updateUserDto) {
      this.userService.update(email, updateUserDto);
      return 'Usuário atualizado com sucesso!';
    } else {
      throw new NotFoundException();
    }
  }

  @Delete()
  async remove(@Query('email') email: string) {
    const isValidUser = await this.userService.findOne(email);
    if (isValidUser) {
      await this.userService.remove(email);
      return 'Usuário deletado com sucesso!';
    } else {
      throw new NotFoundException();
    }
  }
}
