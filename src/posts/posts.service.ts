import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './interfaces/post.interface';
// import { Posts } from './interfaces/posts.interface';
import { PostDTO } from './dto/post.dto';

@Injectable()
export class PostsService {
    constructor(@InjectModel('Post') private readonly postModel: Model<Post>) {}
  async getAllPosts(): Promise<any> {
    const allPosts = this.postModel.find()
    return allPosts
  }
  async addingPost(postDTO: PostDTO): Promise<any> {
    const test = await new this.postModel(postDTO).save();
    console.log(test, 'test')
    return {
      image: postDTO.image,
      header: postDTO.header,
      description: postDTO.description,
      comments: postDTO.comments,
    }
  }

  async editPost(postDTO: PostDTO): Promise<any> {
    return 'test'
  }

  async deletePost(postDTO: PostDTO): Promise<any> {
    return 'test'
  }
}
