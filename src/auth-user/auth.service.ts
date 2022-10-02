import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { UserDTO } from './dto/user-post.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  //   async loginUser(userDTO: UserDTO): Promise<User> {
  async loginUser(userDTO: UserDTO): Promise<any> {
    const existingLogin = await this.userModel.findOne({
      login: userDTO.login,
      password: userDTO.password,
    });
    if (existingLogin) {
      return {
        exists: true,
        login: userDTO.login,
        password: userDTO.password,
      };
    }
    return {
      exists: false,
      login: userDTO.login,
      password: userDTO.password,
    };
  }

  async registryUser(userDTO: UserDTO): Promise<any> {
    const existingLogin = await this.userModel.findOne({
      login: userDTO.login,
    });
    if (existingLogin) {
      return {
        exists: true,
        login: userDTO.login,
        password: userDTO.password,
      };
    }
    await new this.userModel(userDTO).save();
    return {
      exists: false,
      login: userDTO.login,
      password: userDTO.password,
    };
  }
}
