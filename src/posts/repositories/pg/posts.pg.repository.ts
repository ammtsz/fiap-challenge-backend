import { IPost } from "src/posts/entities/models/posts.interface";
import { PostsRepository } from "../posts.repository";
import { Post } from "src/posts/entities/posts.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreatePostDto } from "src/posts/dto/create-post.dto";
import { UpdatePostDto } from "src/posts/dto/update-post.dto";

export class PostsPGRepository implements PostsRepository {
  constructor(
    @InjectRepository(Post) private postsModel: Repository<Post>
  ){}

  async getPosts(): Promise<IPost[]> {
    return this.postsModel
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .select([
        'post.id',
        'post.title',
        'post.content',
        'post.date',
        'user.username',
      ])
      .getMany();
  }

  async filterPosts(term: string): Promise<IPost[]> {
    return this.postsModel
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .select([
        'post.id',
        'post.title',
        'post.content',
        'post.date',
        'user.username',
      ])
      .where('(post.title ILIKE :term OR post.content ILIKE :term)', { term: `%${term}%` })
      .getMany();
  }

  async getPost(id: string): Promise<IPost> {
    return this.postsModel
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .select([
        'post.id',
        'post.title',
        'post.content',
        'post.date',
        'user.username',
      ])
      .where('post.id = :id', { id })
      .getOne();
  }

  async createPost({ user_id, ...post }: CreatePostDto): Promise<void> {
    await this.postsModel.save({
      user: { id: user_id },
      date: new Date(),
      ...post,
    })
  }

  async updatePost(id: string, { user_id, ...post }: UpdatePostDto): Promise<void> {
    const updatedPost = user_id
      ? { user: { id: user_id }, ...post }
      : post
    
      await this.postsModel.update({ id }, updatedPost)
  }

  async deletePost(id: string): Promise<void> {
    await this.postsModel.delete({ id })
  }
}