import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { NotificationsService } from './notifications.service';

import { NotificationsDTO } from '../../dto/notifications.dto';

@WebSocketGateway(88, {
  namespace: 'notifications',
  cors: {
    origin: '*',
  },
})
export class NotificationsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private notificationsService: NotificationsService) {}

  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    console.info(server);
  }

  // @SubscribeMessage('notifications:get')
  // async handleMessagesGet(): Promise<void> {
  //   const notifications = await this.notificationsService.getNotifications(this.roomId);
  // }

  @SubscribeMessage('notification:post')
  async handleMessagePost(
    @MessageBody() notificationsDTO: NotificationsDTO,
  ): Promise<void> {
    await this.notificationsService.createNotifications(notificationsDTO);
    this.server
      .to(notificationsDTO.userToId)
      .emit('notification', notificationsDTO);
  }

  handleConnection(client: Socket, ...args: any[]) {
    const roomId = client.handshake.query.roomId as string;
    client.join(roomId);
    console.info(`Connected ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.info(`Disconnected: ${client.id}`);
  }
}
