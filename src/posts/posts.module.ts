import { Module } from '@nestjs/common';
import { PostsService } from './services/posts.service';
import { PostsController } from './controllers/posts.controller';
import { PostsRepository } from './repositories/posts.repository';
import { PostsPGRepository } from './repositories/pg/posts.pg.repository';
import { Post } from './entities/posts.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
  ],
  providers: [
    {
      provide: PostsRepository,
      useClass: PostsPGRepository
    },
    PostsService
  ],
  controllers: [PostsController],
})
export class PostsModule {}
