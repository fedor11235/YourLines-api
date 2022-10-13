import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
// import { EditController } from './edit.controller';
// import { EditService } from './edit.service';
import { AuthService } from './auth.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class UserModule {}
