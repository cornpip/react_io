import { Module } from '@nestjs/common';
import { PostService } from './service/post.service';
import { PostController } from './controller/post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarkdownPost, PostImage } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MarkdownPost,
      PostImage,
    ])
  ],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule { }
