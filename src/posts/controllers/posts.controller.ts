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
} from '@nestjs/common';
import { PostsService } from '../services/posts.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll() {
    try {
      return this.postsService.findAll();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get('admin')
  findAllAdmin() {
    try {
      return this.postsService.findAll();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get('search')
  filter(@Query('term') term: string) {
    try {
      return this.postsService.filter(term);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.postsService.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Post()
  async create(@Body() post: CreatePostDto) {
    try {
      await this.postsService.create(post);
      return 'Post criado com sucesso!';
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    try {
      const isValidPost = await this.postsService.findOne(id);
      if (isValidPost) {
        await this.postsService.update(id, updatePostDto);
        return 'Post atualizado com sucesso!';
      } else {
          throw new NotFoundException();
      }
    } catch (error) {
        throw new InternalServerErrorException(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const isValidPost = await this.postsService.findOne(id);
      if (isValidPost) {
        await this.postsService.remove(id);
        return 'Post excluído com sucesso!';
      } else {
          throw new NotFoundException();
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
