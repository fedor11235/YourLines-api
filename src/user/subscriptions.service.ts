import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './interfaces/auth.interface';
import { FollowerDTO } from './dto/follower.dto';
import { FollowingDTO } from './dto/following.dto';

@Injectable()
export class SubscriptionsService {
  constructor(@InjectModel('User') private readonly authModel: Model<Auth>) {}

  async getAllSubscribers(followingDTO: FollowingDTO): Promise<any> {
    return await this.authModel.find().sort({ _id: -1 });
  }

  async subscribe(followerDTO: FollowerDTO): Promise<any> {
    const user = await this.authModel.findById(followerDTO.id);
  }
}
