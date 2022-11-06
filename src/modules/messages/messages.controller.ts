import {
  Controller,
  Res,
  HttpStatus,
  Post,
  Body,
  Get,
  Delete,
  Param,
  Render,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesDTO } from '../../dto/messages.dto';

import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@ApiTags('Messages')
@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  // @Get(':id')
  // async messageGetAll(@Res() res, @Param('id') id: any) {
  //   const messages = await this.messagesService.messageGetAll(id);
  //   return res.status(HttpStatus.OK).json(messages);
  // }

  // @Post(':id')
  // async messageSend(
  //   @Res() res,
  //   @Param('id') id: any,
  //   @Body() messagesDTO: MessagesDTO,
  // ) {
  //   const result = await this.messagesService.messageSend(messagesDTO, id);
  //   return res.status(HttpStatus.OK).json(result);
  // }

  // @Delete(':id')
  // async messageDelete(@Res() res, @Param('id') id: any) {
  //   const result = await this.messagesService.messageDelete(id);
  //   return res.status(HttpStatus.OK).json(result);
  // }
  // @Get('/chat')
  // @Render('index')
  // Home() {
  //   return;
  // }
  
  @Get('/chat')
  async Chat(@Res() res) {
    console.log('controller chat')
    const messages = await this.messagesService.getMessages();
    res.json(messages);
  }
}
