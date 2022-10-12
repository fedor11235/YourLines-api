import { Module } from '@nestjs/common';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscribers } from './entity/subscribers.entity';
import { Subscriptions } from './entity/subscriptions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subscribers, Subscriptions])],
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
})
export class SubscriptionModule {}
