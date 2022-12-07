import { Module } from '@nestjs/common';

import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { NotificationsGateway } from './notifications.gateway';

import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../constants';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Notifications } from '../../entities/notifications.entity';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
    TypeOrmModule.forFeature([User, Notifications]),
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService, NotificationsGateway],
})
export class NotificationsModule {}
