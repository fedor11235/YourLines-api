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
  async getSubscriptions(id: string): Promise<any> {
    return await this.subscriptionsModel.find({
      where: {
        idUser: id,
      },
    });
  }
  async getSubscribers(id: string): Promise<any> {
    return await this.subscribersModel.find({
      where: {
        idUser: id,
      },
    });
  }
  async subscribe(body: SubscriptionDTO): Promise<any> {
    const subscriptionsToUpdate = await this.subscriptionsModel.findOneBy({
      idUser: body.id,
      subscriptions: body.idSubscriptions,
    });

    if (!subscriptionsToUpdate) {
      const subscriptions = new Subscriptions();
      subscriptions.idUser = body.id;
      subscriptions.subscriptions = body.idSubscriptions;

      await this.subscriptionsModel.save(subscriptions);

      const subscribers = new Subscribers();
      subscribers.idUser = body.idSubscriptions;
      subscribers.subscribers = body.id;

      await this.subscribersModel.save(subscribers);

      return true;
    }
    // this.subscriptionsModel
    return false;
  }
}
