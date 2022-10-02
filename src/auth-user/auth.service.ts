import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './interfaces/auth.interface';
import { AuthDTO } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private readonly authModel: Model<Auth>) {}

  //   async loginUser(userDTO: UserDTO): Promise<User> {
  async loginUser(authDTO: AuthDTO): Promise<any> {
    const existingLogin = await this.authModel.findOne({
      login: authDTO.login,
      password: authDTO.password,
    });
    if (existingLogin) {
      return {
        exists: true,
        login: authDTO.login,
        password: authDTO.password,
      };
    }
    return {
      exists: false,
      login: authDTO.login,
      password: authDTO.password,
    };
  }

  async registryUser(authDTO: AuthDTO): Promise<any> {
    const existingLogin = await this.authModel.findOne({
      login: authDTO.login,
    });
    if (existingLogin) {
      return {
        exists: true,
        login: authDTO.login,
        password: authDTO.password,
      };
    }
    await new this.authModel(authDTO).save();
    return {
      exists: false,
      login: authDTO.login,
      password: authDTO.password,
    };
  }
}
