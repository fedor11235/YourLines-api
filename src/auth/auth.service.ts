import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { CreatePostDTO } from './dto/user-post.dto';

@Injectable()
export class AuthService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async loginUser(): Promise<String> {
        // const posts = await this.userModel.find().exec();
        return 'login';
    }

    async registryUser(): Promise<String> {
        // const post = await this.userModel
        //     .findById(postID)
        //     .exec();
        return 'registry';
    }

    // async loginUser(): Promise<User[]> {
    //     const posts = await this.userModel.find().exec();
    //     return posts;
    // }

    // async registryUser(postID): Promise<User> {
    //     const post = await this.userModel
    //         .findById(postID)
    //         .exec();
    //     return post;
    // }

}
