import { Module } from '@nestjs/common';
import { EditController } from './user.controller';
import { EditService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../constants';
import { Token } from '../../entities/token.entity';
// import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../../strategies/jwt.strategy';
import { GoogleStrategy } from '../../strategies/google.strategy';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
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
  controllers: [EditController],
  providers: [EditService, JwtStrategy, GoogleStrategy],
})
export class UserModule {}
