import { Module } from '@nestjs/common';
import { PostService } from './service/post.service';
import { PostController } from './controller/post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarkdownPost, PostImage } from './entities';
import { MulterModule } from "@nestjs/platform-express"
import { MulterPostConfig } from '@/util/multer_post_config';
import { StreamController } from './controller/stream.controller';
import { ConfigModule } from '@nestjs/config';
import { TestModule } from '@/test/test.module';
import { TestService } from '@/test/test.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MarkdownPost,
      PostImage,
    ]),
    TestModule,
    // MulterModule.registerAsync({
    //   useClass: MulterPostConfig,
    // }),
  ],
  controllers: [PostController, StreamController],
  providers: [
    PostService,
  ]
})
export class PostModule { }
