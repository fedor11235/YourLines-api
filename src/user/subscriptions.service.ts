import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { FollowerDTO } from './dto/follower.dto';
import { FollowingDTO } from './dto/following.dto';
import { User } from './entity/user.entity';

@Injectable()
export class SubscriptionsService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async getAllSubscribers(body: FollowingDTO): Promise<any> {
    return await this.userModel.find().sort({ _id: -1 });
  }

  async subscribe(body: FollowerDTO): Promise<any> {
    const user = await this.userModel.findById(body.id);
  }
}
