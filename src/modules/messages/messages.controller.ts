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
  UseGuards,
  Headers,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesDTO } from '../../dto/messages.dto';

import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Messages')
@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getDialogues(@Res() res, @Headers() headers, @Param('id') id: any) {
    const dialogues = await this.messagesService.getDialogues(headers.authorization);
    return res.status(HttpStatus.OK).json(dialogues);
  }
}
