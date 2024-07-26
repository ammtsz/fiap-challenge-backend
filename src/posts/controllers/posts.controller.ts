import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Query,
  Put,
  Param,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from '../services/posts.service';
import { CreatePostDto, createPostDto } from '../dto/create-post.dto';
import { UpdatePostDto, updatePostDto }  from '../dto/update-post.dto';
import { ZodValidationPipe } from "../../shared/pipe/zod-validation.pipe";
import { AuthGuard } from '../../shared/guards/auth.guard';
import { Roles } from '../../shared/decorators/role.decorator';
import { Role } from '../../shared/enums/role.enum';
import { RoleGuard } from '../../shared/guards/role.guard';
import { QueryFailedError } from 'typeorm';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('posts')
@ApiBearerAuth()
@UseGuards(AuthGuard, RoleGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAll() {
    try {
      const posts = await this.postsService.findAll();
      return posts;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Roles(Role.Admin)
  @Get('admin')
  async findAllAdmin() {
    try {
      const posts = await this.postsService.findAll();
      return posts;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get('search')
  async filter(@Query('term') term: string) {
    try {
      const posts = await this.postsService.filter(term);
      return posts;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const post = await this.postsService.findOne(id);
      if(!post) throw new NotFoundException();
      return post
    } catch (error) {
      if(error instanceof QueryFailedError) {
        throw new BadRequestException('Formato inválido do ID.');
      } else if(error instanceof NotFoundException) {
        throw new NotFoundException
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  @Roles(Role.Admin, Role.Teacher)
  @UsePipes(new ZodValidationPipe(createPostDto))
  @Post()
  async create(@Body() post: CreatePostDto) {
    try {
      await this.postsService.create(post);
      return 'Post criado com sucesso!';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Roles(Role.Admin, Role.Teacher)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updatePostDto)) updatePostDto: UpdatePostDto
  ) {
    if(Object.keys(updatePostDto).length === 0) {
      throw new BadRequestException('Nenhum dado a ser atualizado. Confira as propriedades informadas.');
    }

    try {
      const isValidPost = !!(await this.postsService.findOne(id));
      if (isValidPost) {
        await this.postsService.update(id, updatePostDto);
        return 'Post atualizado com sucesso!';
      } else {
        throw new NotFoundException();
      }
    } catch (error) {
      if(error instanceof QueryFailedError) {
        throw new BadRequestException('Formato inválido do ID.');
      } else if(error instanceof NotFoundException) {
        throw new NotFoundException();
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  @Roles(Role.Admin, Role.Teacher)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const isValidPost = !!(await this.postsService.findOne(id));
      if (isValidPost) {
        await this.postsService.remove(id);
        return 'Post excluído com sucesso!';
      } else {
          throw new NotFoundException();
      }
    } catch (error) {
      if(error instanceof QueryFailedError) {
        throw new BadRequestException('Formato inválido do ID.');
      } else if(error instanceof NotFoundException) {
        throw new NotFoundException();
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }
}
