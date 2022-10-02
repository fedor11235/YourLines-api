import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
// import { Post } from './interfaces/post.interface';
import { Posts } from './interfaces/posts.interface';
import { PostDTO } from './dto/post.dto';

@Injectable()
export class PostsService {
  constructor(@InjectModel('Post') private readonly postModel: Model<Posts>) {}
  async getAllPosts(): Promise<any> {
    const allPosts = this.postModel.find();
    return allPosts;
  }
  async addingPost(postDTO: PostDTO): Promise<void> {
    await new this.postModel(postDTO).save();
  }

  async updatePost(postDTO: PostDTO, id: string): Promise<void> {
    await this.postModel.updateOne({ id: id }, postDTO);
  }

  async deletePost(id: string): Promise<void> {
    const deletedPost = await this.postModel.findById(id);
    deletedPost.remove();
  }
}
