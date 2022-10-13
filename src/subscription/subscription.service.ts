import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubscriptionDTO } from './dto/subscription.dto';
import { Subscribers } from './entity/subscribers.entity';
import { Subscriptions } from './entity/subscriptions.entity';
import { User } from '../user/entity/user.entity';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscribers)
    private readonly subscribersModel: Repository<Subscribers>,
    @InjectRepository(Subscriptions)
    private readonly subscriptionsModel: Repository<Subscriptions>,
    @InjectRepository(User)
    private readonly userModel: Repository<User>,
  ) {}
  async getSubscriptions(id: any): Promise<any> {
    // return await this.subscriptionsModel.find({
    //   where: {
    //     idUser: id,
    //   },
    // });
  }
  async getSubscribers(id: any): Promise<any> {
    // return await this.subscribersModel.find({
    //   where: {
    //     idUser: id,
    //   },
    // });
  }
  async subscribe(body: SubscriptionDTO): Promise<any> {
    const user: User = await this.userModel.findOneBy({
      nickname: body.nickUser,
    });

    const subscribing: User = await this.userModel.findOneBy({
      nickname: body.nickSubscriptions,
    });

    const subscriptions = new Subscriptions();
    subscriptions.user = user;
    subscriptions.subscriptions = subscribing;

    await this.subscriptionsModel.save(subscriptions);

    const subscribers = new Subscribers();
    subscribers.user = subscribing;
    subscribers.subscribers = user;

    await this.subscribersModel.save(subscribers);

    return 'ok';
  }
}
