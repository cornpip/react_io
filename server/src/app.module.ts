import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import configuration from '@/config/configuration'
import { DbConfig } from './config/db.config';
import { UtilModule } from './util/util.module';
import { TestController } from './test/test.controller';
import { TestService } from './test/test.service';
import { TestModule } from './test/test.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    TypeOrmModule.forRootAsync({
      useClass: DbConfig
    }),
    PostModule,
    UtilModule,
    TestModule,
  ],
  controllers: [AppController, TestController],
  providers: [AppService],
})
export class AppModule { }
