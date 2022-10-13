import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostDTO } from './dto/post.dto';
import { Posts } from './entity/posts.entity';
import { User } from '../user/entity/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts) private readonly postModel: Repository<Posts>,
    @InjectRepository(User) private readonly userModel: Repository<User>,
  ) {}
  async getAllPosts(nickname: any): Promise<any> {
    const result = await this.userModel.find({
      where: {
        nickname: nickname,
      },
      relations: {
        posts: true,
        comment: true,
      },
    });
    return result;
  }
  async addingPost(body: PostDTO, nickname: any): Promise<Posts> {
    const user = await this.userModel.findOneBy({
      nickname: nickname,
    });

    const post: Posts = new Posts();

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

    post.user = user;
    return await this.postModel.save(post);
  }

  async updatePost(body: PostDTO, id: any): Promise<Posts> {
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

  async deletePost(id: any): Promise<Posts> {
    const postToDelete = await this.postModel.findOneBy({
      id: id,
    });
    return await this.postModel.remove(postToDelete);
  }
}
