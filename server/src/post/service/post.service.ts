import { Injectable } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contents } from '../entities/contents.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Contents)
    private postingRepo: Repository<Contents>,
  ) { }

  async create(
    createPostDto: CreatePostDto,
    files: { image ?: Array<Express.Multer.File>, md ?: Array<Express.Multer.File>}
    ) {
    console.log(createPostDto);

    const posting = new Contents()
    posting.md_path = './test'
    // await this.postingRepo.save(posting)
    return 'This action adds a new post';
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
