import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
// import { SubscriptionsController } from './subscriptions.controller';
import { EditController } from './edit.controller';
import { AuthService } from './auth.service';
import { EditService } from './edit.service';
// import { SubscriptionsService } from './subscriptions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController, EditController],
  providers: [AuthService, EditService],
})
export class UserModule {}
