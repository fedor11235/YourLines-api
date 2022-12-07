import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { Token } from '../../entities/token.entity';
import { Notifications } from '../../entities/notifications.entity';
import { JwtService } from '@nestjs/jwt';

import { NotificationsDTO } from '../../dto/notifications.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(User)
    private readonly userModel: Repository<User>,

    @InjectRepository(Notifications)
    private readonly notificationsModel: Repository<Notifications>,

    private jwtService: JwtService,
  ) {}

  // скорее всего нужно выдавать уведомления при получения данных пользователя
  // async getNotifications(userId: string) {
  //   const result = await this.notificationsModel.find({})
  // }
  
  //TODO ошибка с сохраненим userToId
  async createNotifications(notificationsDTO: NotificationsDTO) {
    const userFrom: User = await this.userModel.findOneBy({
      id: notificationsDTO.userFromId,
    });
    const userTo: User = await this.userModel.findOneBy({
      id: notificationsDTO.userToId,
    });

    const notifications: Notifications = new Notifications();

    notifications.userFrom = userFrom;
    notifications.userTo = userTo;
    notifications.type = notificationsDTO.type;
    notifications.info = notificationsDTO.info;

    await this.notificationsModel.save(notifications);
  }

  async viewedNotifications(token) {
    // TODO переделать на боллее явный способ просмотра уведомления
    const decodeToken: any = this.jwtService.decode(token.slice(7));

    const userTo: User = await this.userModel.findOne({
      where: {
        id: decodeToken.id
      },
      relations: {
        notifications: true
      }
    });

    userTo.notifications.forEach(notification => notification.viewed = true)

    await this.notificationsModel.save(userTo.notifications);
  }
}
