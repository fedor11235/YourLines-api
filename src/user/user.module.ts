import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { EditController } from './edit.controller';
import { EditService } from './edit.service';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../constants';
import { Token } from './entity/token.entity';
// import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../jwt/jwt.strategy';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
// import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
    TypeOrmModule.forFeature([User, Token]),
  ],
  controllers: [AuthController, EditController],
  providers: [AuthService, EditService, JwtStrategy],
})
export class UserModule {}
