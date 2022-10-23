import { Injectable } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MarkdownPost } from '../entities/markdownpost.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(MarkdownPost)
    private markdownrepo: Repository<MarkdownPost>,
  ) { }

  async create(
    createPostDto: CreatePostDto,
    files: { image ?: Array<Express.Multer.File>, md ?: Array<Express.Multer.File>}
    ) {
    // console.log(createPostDto);
    // console.log(files);
    const mdpost = new MarkdownPost();
    mdpost.featureTitle = createPostDto.feature_title;
    mdpost.mdPath = files.md[0].path;
    if (files.image) mdpost.imagePath = files.image[0].path;
    // mdpost.imagePath = "markdown\\\\docker_1666543648543-540566015.txt"
    console.log(mdpost);
    await this.markdownrepo.save(mdpost);

    return 'This action adds a new mdpost';
  }

  findAll() {
    return `This action returns all post`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
