import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './interfaces/auth.interface';
import { AuthDTO } from './dto/auth.dto';
import { EditingDTO } from './dto/editing.dto';
import { FollowerDTO } from './dto/follower.dto';
import { FollowingDTO } from './dto/following.dto';
import { RegistrationDTO } from './dto/registration.dto';

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

  async registryUser(registrationDTO: RegistrationDTO): Promise<boolean> {
    const existingLogin = await this.authModel.findOne({
      login: registrationDTO.login,
    });
    if (existingLogin) {
      return true;
    }
    await new this.authModel(registrationDTO).save();
    return false;
  }

  async editing(editingDTO: EditingDTO, id: string): Promise<void> {
    await this.authModel.updateOne({ id: id }, editingDTO);
  }

  async getAllSubscribers(followingDTO: FollowingDTO): Promise<any> {
    return await this.authModel.find().sort({ _id: -1 });
  }

  async subscribe(followerDTO: FollowerDTO): Promise<any> {
    const user = await this.authModel.findById(followerDTO.id);
    console.log(user)
  }
}
