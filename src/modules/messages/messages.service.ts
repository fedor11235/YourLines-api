import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { Messages } from '../../entities/messages.entity';
import { JwtService } from '@nestjs/jwt';
import { MessagesDTO } from '../../dto/messages.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Messages)
    private readonly messagesModel: Repository<Messages>,
    @InjectRepository(User) private readonly userModel: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async getDialogues(token): Promise<any> {
    const decodeToken: any = this.jwtService.decode(token.slice(7));
    const messages = await this.messagesModel.find({
      where: {
        userId: decodeToken.id,
      },
      relations: {
        userDialog: true,
      },
    });
    const arrTemp = {};

    const result = messages
      .reverse()
      .filter(({ roomId }) => !arrTemp[roomId] && (arrTemp[roomId] = 1));
    return result;
  }

  async getMessages(roomId): Promise<any> {
    return await this.messagesModel.find({
      where: {
        roomId: roomId,
      },
    });
  }

  async createMessage(data: any) {
    const messages = new Messages();
    const user = await this.userModel.findOneBy({
      id: data.userId,
    });

    messages.roomId = data.roomId;
    messages.userId = data.userId;
    messages.nickname = data.nickname;
    messages.text = data.text;
    messages.userDialog = user;

    await this.messagesModel.save(messages);
  }
}
