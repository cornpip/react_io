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
  Req,
  ParseFilePipe,
  FileTypeValidator,
} from '@nestjs/common';
import { PostService } from '../service/post.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { IsFile } from '@/util/multer-pipe';

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly isFile: IsFile,
  ) { }
  @Post('/')
  // @UseInterceptors(FilesInterceptor('files', 2, MulterOption)) //MulterOption
  @UseInterceptors(FileFieldsInterceptor([
    { name: "images", maxCount: 5 },
    { name: "md", maxCount: 1 }
  ]))
  create(
    @UploadedFiles(new IsFile())
    files: { images?: Array<Express.Multer.File>, md?: Array<Express.Multer.File> },
    @Body() createPostDto: CreatePostDto
  ) {
    console.log("hello localhost/post")
    return this.postService.create(createPostDto, files);
    // interceptor, uploaded 둘 다 file/files 구분한다.
  }

  @Get('/all')
  findAll() {
    console.log("##### get all");
    return this.postService.findAll();
  }

  @Get(':id')
  // @Header('Content-Type', 'image/jpeg')
  findOne(
    @Param('id') id: number
  ) {
    return this.postService.findOne(id);
  }

  @Post('/test')
  @UseInterceptors(FilesInterceptor('md'))
  test(
    // @UploadedFiles(
    //   // new IsFile(),
    // )
    // files: any,
    @Body() body: any
  ) {
    // console.log(files);
    console.log(body);
    return `test 입니당`
  }

  @Post('/file')
  findFile(
    @Body() body: any
  ) { //: StreamableFile
    // book_1666524175087-876151646.png
    //docker_1666534732389-598109478.txt
    console.log(body);
    console.log("##### get File");
    // const file = createReadStream(join(process.cwd(), `markdown\docker_1666534732389-598109478.txt`));
    // console.log(file.path);
    // return new StreamableFile(file);
    return
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
