import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Bind,
  UploadedFiles,
  StreamableFile,
  Res,
  Header,
} from '@nestjs/common';
import { PostService } from '../service/post.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { MulterOption } from '@/util/multer_option';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Response } from 'express';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }
  @Post()
  // @UseInterceptors(FilesInterceptor('files', 2, MulterOption)) //MulterOption
  @UseInterceptors(FileFieldsInterceptor([
      {name : "image", maxCount : 1},
      {name : "md", maxCount : 1}
  ], MulterOption))
  create(
    @Body() createPostDto: CreatePostDto,
    @UploadedFiles()
    files : { image ?: Array<Express.Multer.File>, md ?: Array<Express.Multer.File>}
  ) {
    console.log("hello localhost/post")
    // console.log(files.image[0].filename, files.image[0].path);
    return this.postService.create(createPostDto, files);

    // interceptor, uploaded 둘 다 file/files 구분한다.
  }

  @Get(':id')
  // @Header('Content-Type', 'image/jpeg')
  findOne(
    @Param('id') id: string 
  ): StreamableFile {
    // book_1666524175087-876151646.png
    //docker_1666534732389-598109478.txt
    const file = createReadStream(join(process.cwd(), `markdown\docker_1666534732389-598109478.txt`));
    console.log(file.path);
    console.log(id);
    return new StreamableFile(file);
  }

  @Get('/all')
  findAll() {
    return this.postService.findAll();
  }
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
