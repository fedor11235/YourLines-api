import { Module } from '@nestjs/common';
import { AuthController, UserController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthSchema } from './schemas/auth.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: AuthSchema }])],
  controllers: [AuthController, UserController],
  providers: [AuthService],
})
export class AuthUserModule {}
