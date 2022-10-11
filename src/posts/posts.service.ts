import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostDTO } from './dto/post.dto';
import { Post } from './entity/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly postModel: Repository<Post>,
  ) {}
  async getAllPosts(): Promise<any> {
    return await this.postModel.find();
  }
  async addingPost(body: PostDTO): Promise<Post> {
    const post: Post = new Post();

    if (body.image) {
      post.image = body.image;
    }
    if (body.header) {
      post.image = body.header;
    }
    if (body.description) {
      post.image = body.description;
    }
    if (body.comments) {
      post.image = body.comments;
    }
    return await this.postModel.save(post);
  }

  async updatePost(body: PostDTO, id: number): Promise<Post> {
    const postToUpdate = await this.postModel.findOneBy({
      id: id,
    });

    if (body.image) {
      postToUpdate.image = body.image;
    }
    if (body.header) {
      postToUpdate.image = body.header;
    }
    if (body.description) {
      postToUpdate.image = body.description;
    }
    if (body.comments) {
      postToUpdate.image = body.comments;
    }

    return await this.postModel.save(postToUpdate);
  }

  async deletePost(id: number): Promise<Post> {
    const postToDelete = await this.postModel.findOneBy({
      id: id,
    });
    return await this.postModel.remove(postToDelete);
  }
}
