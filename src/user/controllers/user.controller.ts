import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { DuplicateRecordException } from 'src/filters/duplicate-record-exception.filter';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() user: CreateUserDto) {
    const isDuplicatedUser = await this.userService.findOne(user.email);
    if (isDuplicatedUser) {
      throw new DuplicateRecordException();
    }
    this.userService.create(user);
    return 'Usuário criado com sucesso!'
  }

  @Get()
  async findOne(@Query('email') email: string) {
    const user = await this.userService.findOne(email);
    if (user) {
      return user;
    } else {
      return 'Ocorreu um erro com a requisição solicitada. Verfique os dados fornecidos e tente novamente.'
    }
  }

  @Patch()
  async update(@Query('email') email: string, @Body() updateUserDto: UpdateUserDto) {
    const isValidUser = await this.userService.findOne(email);
    const isExistUser = await this.userService.findOne(updateUserDto.email);
    if (updateUserDto && email && isValidUser) {
      if(isExistUser) {
        throw new DuplicateRecordException();
      }  
      this.userService.update(email, updateUserDto);
      return 'Usuário atualizado com sucesso!'
    } else {
      return 'Ocorreu um erro com a requisição solicitada. Verfique os dados fornecidos e tente novamente.'
    }
  }

  @Delete()
  async remove(@Query('email') email: string) {
    const isValidUser = await this.userService.findOne(email);
    if (email && isValidUser) {
      this.userService.remove(email);
      return 'Usuário deletado com sucesso!'
    } else {
      return 'Ocorreu um erro com a requisição solicitada. Verfique os dados fornecidos e tente novamente.'
    }
  }
}
