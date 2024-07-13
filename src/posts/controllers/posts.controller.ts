import { Controller, Get, Post, Body, Delete, Query, Put, Param, BadRequestException, NotFoundException } from '@nestjs/common';
import { PostsService } from '../services/posts.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAll() {
    try {
      return await this.postsService.findAll();
    } catch (error) {
        throw new NotFoundException(error); 
    }
  }

  @Get('admin')
  async findAllAdmin() {
    try {
      return await this.postsService.findAll();
    } catch (error) {
        throw new NotFoundException(error); 
    }
  }

  @Get('search')
  async filter(@Query('term') term: string) {
    try {
      return await this.postsService.filter(term);
    } catch (error) {
        throw new NotFoundException(error); 
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.postsService.findOne(id);
    } catch (error) {
        throw new NotFoundException(error);
    }
  }

  @Post()
  async create(@Body() post: CreatePostDto) {
    try {
      await this.postsService.create(post);
      return 'Post criado com sucesso!'
    } catch (error) {
        throw new BadRequestException(error);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    try {
      await this.postsService.update(id, updatePostDto);
      return 'Post atualizado com sucesso!'
    } catch (error) {
        throw new BadRequestException(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const isValidPost = await this.postsService.findOne(id)
    if(isValidPost) {
      try {
        await this.postsService.remove(id);
        return 'Post excluído com sucesso!'
      } catch (error) {
          throw new BadRequestException(error);
      }
    } else {
      throw new NotFoundException();
    }
  }

}
