import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UsePipes, BadRequestException } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { DuplicateRecordException } from '../../filters/duplicate-record-exception.filter';
import { CreateUserDto, createUserDto } from '../dto/create-user.dto';
import { UpdateUserDto, updateUserDto } from '../dto/update-user.dto';
import { ZodValidationPipe } from "../../shared/pipe/zod-validation.pipe";
import { hashSync } from 'bcryptjs';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(new ZodValidationPipe(createUserDto))
  @Post()
  async create(@Body() {email, password, ...user}: CreateUserDto) {
    const isDuplicatedUser = !!(await this.userService.findOne(email));
    if (isDuplicatedUser) {
      throw new DuplicateRecordException();
    }

    this.userService.create({
      email,
      password: hashSync(password, 8),
      ...user,
    });
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
  async update(
    @Query('email') email: string,
    @Body(new ZodValidationPipe(updateUserDto)) updateUserDto: UpdateUserDto
  ) {
    if(Object.keys(updateUserDto).length === 0) {
      throw new BadRequestException('Nenhum dado a ser atualizado. Confira as propriedades informadas.');
    }
    
    const isValidUser = !!(await this.userService.findOne(email));
    
    if (email && isValidUser) {
      if(updateUserDto.email) {
        const isExistUser = !!(await this.userService.findOne(updateUserDto.email));  
        
        if(isExistUser) {
          throw new DuplicateRecordException();
        }  
      }

      this.userService.update(email, updateUserDto);
      return 'Usuário atualizado com sucesso!'
    } else {
      return 'Ocorreu um erro com a requisição solicitada. Verfique os dados fornecidos e tente novamente.'
    }
  }

  @Delete()
  async remove(@Query('email') email: string) {
    const isValidUser = !!(await this.userService.findOne(email));
    if (email && isValidUser) {
      this.userService.remove(email);
      return 'Usuário deletado com sucesso!'
    } else {
      return 'Ocorreu um erro com a requisição solicitada. Verfique os dados fornecidos e tente novamente.'
    }
  }
}
