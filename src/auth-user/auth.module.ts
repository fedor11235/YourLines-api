import { Module } from '@nestjs/common';
import {
  AuthController,
  UserController,
  SubscriptionsController,
} from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthSchema } from './schemas/auth.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: AuthSchema }])],
  controllers: [AuthController, UserController, SubscriptionsController],
  providers: [AuthService],
})
export class AuthUserModule {}
