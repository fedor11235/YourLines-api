import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostDTO } from '../../dto/post.dto';
import { Posts } from '../../entities/posts.entity';
import { User } from '../../entities/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts) private readonly postModel: Repository<Posts>,
    @InjectRepository(User) private readonly userModel: Repository<User>,
  ) {}
  async getAllPosts(): Promise<any> {
    const result = await this.postModel.find({
      order: {
        createdAt: 'DESC',
      },
      relations: {
        user: true,
        // comment: true,
        comment: {
          user: true,
        }
      },
    });
    return result;
  }
  async getAllUserPosts(id: any): Promise<any> {
    const result: any = await this.userModel.findOne({
      where: {
        id: id,
      },
      relations: {
        posts: true,
        comment: true,
      },
    });
    const posts = result.posts.reverse();
    return posts;
  }
  async addingPost(body: PostDTO, id: any): Promise<Posts> {
    const user = await this.userModel.findOneBy({ id: id });

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

  async addLikePosts(id: any): Promise<any> {
    const result: any = await this.postModel.findOne({
      where: {
        id: id,
      }
    });
    if(result.likes !== null) {
      result.likes += 1
    } else {
      result.likes = 0
    }
    this.postModel.save(result)
    return 'ok';
  }
}
