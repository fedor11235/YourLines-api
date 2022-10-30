import { Module } from '@nestjs/common';
import { AuthController, GoogleController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../constants';
import { Token } from '../../entities/token.entity';
import { JwtStrategy } from '../../strategies/jwt.strategy';
import { GoogleStrategy } from '../../strategies/google.strategy';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
    TypeOrmModule.forFeature([User, Token]),
  ],
  controllers: [AuthController, GoogleController],
  providers: [AuthService, JwtStrategy, GoogleStrategy],
})
export class AuthModule {}
