import { Module } from '@nestjs/common';
import { PostService } from './service/post.service';
import { PostController } from './controller/post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contents } from './entities/contents.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contents])],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
