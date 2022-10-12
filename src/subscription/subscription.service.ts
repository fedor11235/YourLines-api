import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubscriptionDTO } from './dto/subscription.dto';
import { Subscribers } from './entity/subscribers.entity';
import { Subscriptions } from './entity/subscriptions.entity';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscribers)
    private readonly subscribersModel: Repository<Subscribers>,
    @InjectRepository(Subscriptions)
    private readonly subscriptionsModel: Repository<Subscriptions>,
  ) {}
  getSubscriptions(): string {
    return 'Hello World!';
  }
  getSubscribers(): string {
    return 'Hello World!';
  }
  async subscribe(body: SubscriptionDTO): Promise<any> {
    const subscriptionsToUpdate = await this.subscriptionsModel.findOneBy({
      idUser: body.id,
      subscriptions: body.idSubscriptions,
    });

    // if (!subscriptionsToUpdate) {

    // }
    // this.subscriptionsModel
    return 'Hello World!';
  }
}
