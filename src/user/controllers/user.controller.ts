import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UsePipes, BadRequestException, NotFoundException, UseGuards, Req } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { DuplicateRecordException } from '../../shared/filters/duplicate-record-exception.filter';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { CreateUserDto, createUserDto } from '../dto/create-user.dto';
import { UpdateUserDto, updateUserDto } from '../dto/update-user.dto';
import { ZodValidationPipe } from "../../shared/pipe/zod-validation.pipe";
import { hashSync } from 'bcryptjs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '../../shared/enums/role.enum';
import { IUser } from '../entities/models/user.interface';

@ApiTags('user')
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

  @Get('logged')
  @UseGuards(AuthGuard)
  async getLoggedUserFromToken(@Req() request: Request) {
    const user = request['user'];
    if (user) {
      return {
        email: user.email,
        username: user.username,
        role: user.roles,
        id: user.sub,
      };
    } else {
      throw new NotFoundException()
    }
  }

  @Get()
  async findOne(@Query('email') email: string) {
    if (!email) {
       throw new BadRequestException('Especifique o e-mail do usuário.')
    }
    const user = await this.userService.findOne(email);
    if (user) {
      return user;
    } else {
      throw new NotFoundException()
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('users')
  async getUsers(@Query('role') role: Role) {
    let users: IUser[];
    if (!role) {
      users = await this.userService.getUsers();
    } else {
      users = await this.userService.getUsersByRole(role);
    }
    if (users) {
      return users;
    } else {
      throw new NotFoundException()
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch()
  async update(
    @Query('email') email: string,
    @Body(new ZodValidationPipe(updateUserDto)) updateUserDto: UpdateUserDto
  ) {
    if(!email) throw new BadRequestException('Especifique o e-mail do usuário.')

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
      throw new NotFoundException()
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete()
  async remove(@Query('email') email: string) {
    if(!email) throw new BadRequestException('Especifique o e-mail do usuário.')

    const isValidUser = !!(await this.userService.findOne(email));
    if (isValidUser) {
      this.userService.remove(email);
      return 'Usuário deletado com sucesso!'
    } else {
      throw new NotFoundException()
    }
  }
}
