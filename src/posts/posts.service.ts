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
      post.header = body.header;
    }
    if (body.description) {
      post.description = body.description;
    }
    if (body.comments) {
      post.comments = body.comments;
    }
    return await this.postModel.save(post);
  }

  async updatePost(body: PostDTO, id: string): Promise<Post> {
    const postToUpdate = await this.postModel.findOneBy({
      id: id,
    });

    if (body.image) {
      postToUpdate.image = body.image;
    }
    if (body.header) {
      postToUpdate.header = body.header;
    }
    if (body.description) {
      postToUpdate.description = body.description;
    }
    if (body.comments) {
      postToUpdate.comments = body.comments;
    }

    return await this.postModel.save(postToUpdate);
  }

  async deletePost(id: string): Promise<Post> {
    const postToDelete = await this.postModel.findOneBy({
      id: id,
    });
    return await this.postModel.remove(postToDelete);
  }
}
