import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { SubscriptionsController } from './subscriptions.controller';
import { EditController } from './edit.controller';
import { AuthService } from './auth.service';
import { EditService } from './edit.service';
import { SubscriptionsService } from './subscriptions.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthSchema } from './schemas/auth.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: AuthSchema }])],
  controllers: [AuthController, EditController, SubscriptionsController],
  providers: [AuthService, EditService, SubscriptionsService],
})
export class UserModule {}
