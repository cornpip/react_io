import { Module } from '@nestjs/common';
import { PostService } from './service/post.service';
import { PostController } from './controller/post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posting } from './entities/posting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Posting])],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
