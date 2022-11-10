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
  UploadedFiles,
  Res,
  Header,
  Req,
  ParseFilePipe,
  FileTypeValidator,
  Logger,
} from '@nestjs/common';
import { PostService } from '../service/post.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { IsFile } from '@/util/is_file';

@Controller('post')
export class PostController {
  private readonly logger = new Logger(PostController.name);

  constructor(
    private readonly postService: PostService,
  ) { }

  @Post('/')
  // @UseInterceptors(FilesInterceptor('files', 2, MulterOption)) //MulterOption
  @UseInterceptors(FileFieldsInterceptor([
    { name: "image", maxCount: 1 },
    { name: "md", maxCount: 1 }
  ]))
  create(
    // 일단 create에서 받는 image는 대표 image 하나로 생각
    // 현재 entity 는 images다
    @UploadedFiles(new IsFile())
    files: { image?: Array<Express.Multer.File>, md?: Array<Express.Multer.File> },
    @Body() createPostDto: CreatePostDto
  ) {
    this.logger.debug("hello localhost/post")
    // return this.postService.create(createPostDto, files);
    // interceptor, uploaded 둘 다 file/files 구분한다.
  }

  @Get('/all')
  findAll() {
    this.logger.debug("##### get all");
    return this.postService.findAll();
  }

  @Get(':id')
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
    // this.logger.debug(files);
    this.logger.debug(body);
    return `test 입니당`
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
