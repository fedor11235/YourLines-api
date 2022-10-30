import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubscriptionDTO } from '../../dto/subscription.dto';
import { Subscribers } from '../../entities/subscribers.entity';
import { Subscriptions } from '../../entities/subscriptions.entity';
import { User } from '../../entities/user.entity';

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
  async getSubscriptions(nickname: any): Promise<any> {
    const result = await this.subscriptionsModel.find({
      where: {
        user: nickname,
      },
    });

    const subscriptions = [];

    for (const elem of result) {
      subscriptions.push(
        await this.userModel.find({ where: { nickname: elem.subscriptions } }),
      );
    }

    return subscriptions;
  }
  async getSubscribers(nickname: any): Promise<any> {
    const result = await this.subscribersModel.find({
      where: {
        user: nickname,
      },
    });

    const subscribers = [];

    for (const elem of result) {
      subscribers.push(
        await this.userModel.find({ where: { nickname: elem.subscriptions } }),
      );
    }

    return subscribers;
  }
  async subscribe(body: SubscriptionDTO): Promise<any> {
    // const user: User = await this.userModel.findOneBy({
    //   nickname: body.nickUser,
    // });

    // const subscribing: User = await this.userModel.findOneBy({
    //   nickname: body.nickSubscriptions,
    // });

    const subscriptions = new Subscriptions();
    subscriptions.user = body.nickUser;
    subscriptions.subscriptions = body.nickSubscriptions;

    await this.subscriptionsModel.save(subscriptions);

    const subscribers = new Subscribers();
    subscribers.user = body.nickSubscriptions;
    subscribers.subscriptions = body.nickUser;

    await this.subscribersModel.save(subscribers);

    return 'ok';
  }
}
