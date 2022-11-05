import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { SubscriptionDTO } from '../../dto/subscription.dto';
import { Subscribers } from '../../entities/subscribers.entity';
import { Subscriptions } from '../../entities/subscriptions.entity';
import { User } from '../../entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscribers)
    private readonly subscribersModel: Repository<Subscribers>,
    @InjectRepository(Subscriptions)
    private readonly subscriptionsModel: Repository<Subscriptions>,
    @InjectRepository(User)
    private readonly userModel: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async getSubscriptions(token: any): Promise<any> {
    const decodeToken: any = this.jwtService.decode(token.slice(7));
    const result = await this.subscriptionsModel.find({
      where: {
        user: decodeToken.id,
      },
    });
    return await this.userModel.find({
      where: { id: In(result.map((e) => e.subscriptions)) },
    });
  }
  async getSubscribers(token: any): Promise<any> {
    const decodeToken: any = this.jwtService.decode(token.slice(7));
    const result = await this.subscribersModel.find({
      where: {
        user: decodeToken.id,
      },
    });

    return await this.userModel.find({
      where: { id: In(result.map((e) => e.subscriptions)) },
    });
  }
  async subscribe(token: string, id: string): Promise<any> {
    const decodeToken: any = this.jwtService.decode(token.slice(7));

    const subscriptions = new Subscriptions();
    subscriptions.user = decodeToken.id;
    subscriptions.subscriptions = id;

    await this.subscriptionsModel.save(subscriptions);

    const subscribers = new Subscribers();
    subscribers.user = id;
    subscribers.subscriptions = decodeToken.id;

    await this.subscribersModel.save(subscribers);

    return 'ok';
  }
  async unsubscribe(token: string, id: string): Promise<any> {
    const decodeToken: any = this.jwtService.decode(token.slice(7));

    const subscription = await this.subscriptionsModel.findOne({
      where: {
        user: decodeToken.id,
        subscriptions: id,
      },
    });

    await this.subscriptionsModel.remove(subscription);

    const subscribers = await this.subscribersModel.findOne({
      where: {
        user: id,
        subscriptions: decodeToken.id,
      },
    });

    await this.subscribersModel.remove(subscribers);

    return 'ok';
  }
  async check(token: string, id: string): Promise<any> {
    const decodeToken: any = this.jwtService.decode(token.slice(7));
    const ifSubscription = await this.subscriptionsModel.findOne({
      where: {
        user: decodeToken.id,
        subscriptions: id,
      },
    });
    if (ifSubscription) {
      return true;
    }
    return false;
  }
}
