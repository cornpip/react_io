import { Module } from '@nestjs/common';
import { PostService } from './service/post.service';
import { PostController } from './controller/post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarkdownPost } from './entities/markdownpost.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MarkdownPost])],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
