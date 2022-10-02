import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './interfaces/auth.interface';
import { AuthDTO } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private readonly authModel: Model<Auth>) {}

  async loginUser(authDTO: AuthDTO): Promise<boolean> {
    const existingLogin = await this.authModel.findOne({
      login: authDTO.login,
      password: authDTO.password,
    });
    if (existingLogin) {
      return true;
    }
    return false;
  }

  async registryUser(authDTO: AuthDTO): Promise<boolean> {
    const existingLogin = await this.authModel.findOne({
      login: authDTO.login,
    });
    if (existingLogin) {
      return true;
    }
    await new this.authModel(authDTO).save();
    return false;
  }
}
