import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
 } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { MessagesService } from './messages.service';
import { Messages } from '../../entities/messages.entity';

const messages = [
  {
    type: 'you',
    text: 'Да, ну лан покеда тогда',
  },
  {
    type: 'you',
    text: 'Пойдешь гулять и че пишешь с мелкой буквы?',
  },
  {
    type: 'another',
    text: 'Ой не извини, занят, вот букву большую сделал, а еще проверю как перенос работает тут, работает?',
  },
  {
    type: 'another',
    text: 'да ниче',
  },
  {
    type: 'you',
    text: 'Хей',
  },
  {
    type: 'you',
    text: 'Привет, че делаешь?',
  },
]

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
 
 @WebSocketServer() server: Server;
 
 @SubscribeMessage('create-message')
 async handleSendMessage(client: Socket, payload: any): Promise<void> {
  console.log('response from the client: ', payload)
  // await this.messagesService.createMessage(payload);
  this.server.emit('create-message', payload);
 }
 
 afterInit(server: Server) {
  console.log(server);
  //Выполняем действия
 }
 
 handleDisconnect(client: Socket) {
  console.log(`Disconnected: ${client.id}`);
  //Выполняем действия
 }
 
 handleConnection(client: Socket, ...args: any[]) {
  console.log(`Connected ${client.id}`);
  this.server.emit('get-messages', messages);
  //Выполняем действия
 }
}
// import {
//   MessageBody,
//   OnGatewayConnection,
//   OnGatewayDisconnect,
//   OnGatewayInit,
//   SubscribeMessage,
//   WebSocketGateway,
//   WebSocketServer
// } from "@nestjs/websockets";
// // import { Prisma } from "@prisma/client";
// import { Server, Socket } from "Socket.IO";
// // import { MessageUpdatePayload } from "types";
// import { CLIENT_URI } from '../../constants';
// import { MessagesService } from "./messages.service";

// const users: Record<string, string> = {};

// @WebSocketGateway({
//   cors: {
//     origin: CLIENT_URI // можно указать `*` для отключения `CORS`
//   },
//   serveClient: false,
//   // название пространства может быть любым, но должно учитываться на клиенте
//   namespace: "chat"
// })
// export class MessagesGateway
//   implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
// {
//   constructor(private readonly messagesService: MessagesService) {}

//   @WebSocketServer() server: Server;

//   afterInit(server: Server) {
//     console.log(server);
//   }
//     // подключение
//   handleConnection(client: Socket, ...args: any[]) {
//     // обратите внимание на структуру объекта `handshake`
//     const userName = client.handshake.query.userName as string;
//     const socketId = client.id;
//     users[socketId] = userName;

//     // передаем информацию всем клиентам, кроме текущего
//     client.broadcast.emit("log", `${userName} connected`);
//   }

//   // отключение
//   handleDisconnect(client: Socket) {
//     const socketId = client.id;
//     const userName = users[socketId];
//     delete users[socketId];

//     client.broadcast.emit("log", `${userName} disconnected`);
//   }

//   // получение всех сообщений
//   @SubscribeMessage("messages:get")
//   async handleMessagesGet(): Promise<void> {
//     const messages = await this.messagesService.getMessages();
//     this.server.emit("messages", messages);
//   }

//   // удаление всех сообщений
//   @SubscribeMessage("messages:clear")
//   async handleMessagesClear(): Promise<void> {
//     await this.messagesService.clearMessages();
//   }

//   // создание сообщения
//   @SubscribeMessage("message:post")
//   async handleMessagePost(
//     @MessageBody()
//     payload: { userId: string, userName: string, text: string }
//   ): Promise<void> {
//     const createdMessage = await this.messagesService.createMessage(payload);
//     // можно сообщать клиентам о каждой операции по отдельности
//     this.server.emit("message:post", createdMessage);
//     // но мы пойдем более простым путем
//     this.handleMessagesGet();
//   }

//   // обновление сообщения
//   @SubscribeMessage("message:put")
//   async handleMessagePut(
//     @MessageBody()
//     payload:  { id: number, text: string }
//   ): Promise<void> {
//     const updatedMessage = await this.messagesService.updateMessage(payload);
//     this.server.emit("message:put", updatedMessage);
//     this.handleMessagesGet();
//   }

//   // удаление сообщения
//   @SubscribeMessage("message:delete")
//   async handleMessageDelete(
//     @MessageBody()
//     payload: { id: number }
//   ) {
//     const removedMessage = await this.messagesService.removeMessage(payload);
//     this.server.emit("message:delete", removedMessage);
//     this.handleMessagesGet();
//   }
// }