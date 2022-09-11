import { Injectable } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Posting } from '../entities/posting.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Posting)
    private postingRepo: Repository<Posting>,
  ) { }

  async create(createPostDto: CreatePostDto) {
    console.log(createPostDto);
    const posting = new Posting()
    posting.md_path = './test'
    await this.postingRepo.save(posting)
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
