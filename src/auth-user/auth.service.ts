import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDTO } from './dto/user-post.dto';

@Injectable()
export class AuthService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async loginUser(createUserDTO: CreateUserDTO): Promise<User> {
        const user = await new this.userModel(createUserDTO)
        return user.save();
    }

    async registryUser(createUserDTO: CreateUserDTO): Promise<User> {
        const newUser = await new this.userModel(createUserDTO)
        return newUser.save();
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
