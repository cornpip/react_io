import { Injectable } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MarkdownPost, PostImage } from '../entities';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(MarkdownPost)
    private markdownrepo: Repository<MarkdownPost>,

    @InjectRepository(PostImage)
    private postimages: Repository<PostImage>
  ) { }

  async create(
    createPostDto: CreatePostDto,
    files: { images ?: Array<Express.Multer.File>, md ?: Array<Express.Multer.File>}
    ) {
    // console.log(createPostDto);
    // console.log(files);
    const mdpost = new MarkdownPost();
    mdpost.featureTitle = createPostDto.feature_title;
    mdpost.mdName = files.md[0].filename;
    await this.markdownrepo.save(mdpost);

    if (files.images) {
      files.images.map(async (img)=> {
        const postimage = new PostImage();
        postimage.post = mdpost;
        postimage.imageName = img.filename;
        await this.postimages.save(postimage)        
      })
    }
    // mdpost.imagePath = "markdown\\\\docker_1666543648543-540566015.txt"
    console.log(mdpost);
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
