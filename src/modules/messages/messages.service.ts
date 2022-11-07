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

  async messageDelete(id: any) {
    // const messagesDelete = await this.messagesModel.findOneBy({ id: id });
    // this.messagesModel.remove(messagesDelete);
    // return 'ok';
  }


  //socket!!!!

  // получение всех сообщений
  async getMessages(roomId): Promise<any> {
    return await this.messagesModel.find({
      where: {
        roomId: roomId
      }
    });
  }

  async createMessage(data: any) {

    const messages = new Messages

    messages.roomId = data.roomId
    messages.userId = data.userId
    messages.nickname = data.nickname
    messages.text = data.text

    await this.messagesModel.save(messages)
  }

  // {
  //   userId: '0f0b9ecf-ba99-47bf-bc0b-17c6f6a641c8',
  //   nickname: 'fedor',
  //   text: 'Кек',
  //   roomId: 'de65717cd446fe62d905c3c7dec58a40'
  // }

  // удаление всех сообщений - для отладки в процессе разработки
  async clearMessages(): Promise<any> {
    // return this.messagesModel.deleteMany();
  }

  // обновление сообщения
  async updateMessage(payload: any) {
    const { id, text } = payload;
    // return this.messagesModel.update({ where: { id }, data: { text } });
  }

  // удаление сообщения
  async removeMessage(where: any) {
    // return this.messagesModel.delete({ where });
  }
}
