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
    await new this.postModel(postDTO).save();
    return {
      image: postDTO.image,
      header: postDTO.header,
      description: postDTO.description,
      comments: postDTO.comments,
    }
  }

  async updatePost(postDTO: PostDTO, id: String): Promise<any> {
    const upDatePost = await this.postModel.updateOne({id:id}, postDTO)
    return upDatePost
  }

  async deletePost(id: String): Promise<any> {
    const deletedPost = await this.postModel.findById(id)
    deletedPost.remove()

    return deletedPost
  }
}
