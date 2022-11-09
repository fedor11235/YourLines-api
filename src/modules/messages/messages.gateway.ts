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
import { MessagesService } from './messages.service';

const users: Record<string, string> = {};

interface MessagePost {
  userId: string;
  text: string;
  roomId: string;
}

@WebSocketGateway(88, {
  namespace: 'chat',
  cors: {
    origin: '*',
  },
})
export class MessagesGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private messagesService: MessagesService) {}

  private roomId: string;

  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    // console.info(server);
  }

  @SubscribeMessage('dialog:get')
  async getDialogues(@MessageBody() payload: MessagePost): Promise<void> {
    const dialogues = await this.messagesService.getDialogues(payload);
    // this.server.to(this.roomId).emit("messages", messages);
  }

  @SubscribeMessage('messages:get')
  async handleMessagesGet(): Promise<void> {
    const messages = await this.messagesService.getMessages(this.roomId);
    this.server.to(this.roomId).emit('messages', messages);
  }

  @SubscribeMessage('message:post')
  async handleMessagePost(@MessageBody() payload: MessagePost): Promise<void> {
    await this.messagesService.createMessage(payload);
    this.server.to(this.roomId).emit('messages', payload);
  }

  handleConnection(client: Socket, ...args: any[]) {
    const nickname = client.handshake.query.nickname as string;
    this.roomId = client.handshake.query.roomId as string;
    const socketId = client.id;

    users[socketId] = nickname;
    users[socketId] = this.roomId;

    client.join(this.roomId);

    client.broadcast.to(this.roomId).emit('log', `${nickname} connected`);
    console.info(`Connected ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    const socketId = client.id;
    const nickname = users[socketId];
    delete users[socketId];

    client.broadcast.to(this.roomId).emit('log', `${nickname} disconnected`);
    console.info(`Disconnected: ${client.id}`);
  }
}
