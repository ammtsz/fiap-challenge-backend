import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { IPost } from '../entities/models/posts.interface';

export abstract class PostsRepository {
  abstract getPosts(): Promise<IPost[]>;
  abstract filterPosts(term: string): Promise<IPost[]>;
  abstract getPost(id: string): Promise<IPost>;
  abstract createPost(post: CreatePostDto): Promise<void>;
  abstract updatePost(id: string, post: UpdatePostDto): Promise<void>;
  abstract deletePost(id: string): Promise<void>;
}
