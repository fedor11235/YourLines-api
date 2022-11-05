import { Module } from '@nestjs/common';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscribers } from '../../entities/subscribers.entity';
import { Subscriptions } from '../../entities/subscriptions.entity';
import { User } from '../../entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../constants';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
    TypeOrmModule.forFeature([Subscribers, Subscriptions, User]),
  ],
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
})
export class SubscriptionModule {}
