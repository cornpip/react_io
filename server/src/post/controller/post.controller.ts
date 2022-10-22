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
  ParseFilePipe,
  FileTypeValidator,
} from '@nestjs/common';
import { PostService } from '../service/post.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { MulterOption } from '@/util/multer_option';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }
  @Post()
  // @UseInterceptors(FilesInterceptor('files', 2, MulterOption)) //MulterOption
  @UseInterceptors(FileFieldsInterceptor([
      {name : "image", maxCount : 1},
      {name : "md", maxCount : 1}
  ]))
  create(
    @Body() createPostDto: CreatePostDto,
    @UploadedFiles()
    files : { title_image ?: Array<Express.Multer.File>, md_content ?: Array<Express.Multer.File>}
  ) {
    console.log("hello localhost/post")
    console.log(files);
    console.log(createPostDto)
    // return this.postService.create(createPostDto);
    return "hello";
    // interceptor, uploaded 둘 다 file/files 구분한다.
  }

  // @Post('/featuredImg')
  // @UseInterceptors(FileInterceptor('file'))


  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
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
