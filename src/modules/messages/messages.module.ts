import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Messages } from '../../entities/messages.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Messages, User])],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
