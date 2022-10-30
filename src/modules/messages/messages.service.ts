import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { Messages } from '../../entities/messages.entity';
import { MessagesDTO } from '../../dto/messages.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Messages)
    private readonly messagesModel: Repository<Messages>,
    @InjectRepository(User) private readonly userModel: Repository<User>,
  ) {}

  async messageGetAll(idUser: any) {
    const messagesAll = await this.messagesModel.findOneBy({ user: idUser });
    return messagesAll
  }

  async messageSend(messagesDTO: MessagesDTO, id: any) {
    const user = await this.userModel.findOneBy({ id: id });
    const recipient = await this.userModel.findOneBy({ id: messagesDTO.recipient });

    const messages: Messages = new Messages();

    messages.text = messagesDTO.text;
    messages.user = user;
    messages.recipient = recipient;

    await this.messagesModel.save(messages);

    return 'ok'
  }

  async messageDelete(id: any) {
    const messagesDelete = await this.messagesModel.findOneBy({ id: id });
    this.messagesModel.remove(messagesDelete)
    return 'ok'
  }
}
