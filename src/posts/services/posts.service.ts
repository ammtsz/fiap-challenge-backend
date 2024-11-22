import { Injectable } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { PostsRepository } from '../repositories/posts.repository';
import { v4 as uuid } from 'uuid'

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}
  
  async findAll() {
    return this.postsRepository.getPosts();
  }

  async findAllByUser(email: string) {
    return this.postsRepository.filterPostsByUser(email);
  }
  
  async filter(term: string) {
    return this.postsRepository.filterPosts(term);
  }

  async findOne(id: string) {
    return this.postsRepository.getPost(id);
  }

  async create({ id, ...post }: CreatePostDto) {
    return this.postsRepository.createPost({
      id: id || uuid(),
      ...post
    });
  }

  async update(id: string, post: UpdatePostDto) {
    return this.postsRepository.updatePost(id, post);
  }

  async remove(id: string) {
    return this.postsRepository.deletePost(id);
  }

}
