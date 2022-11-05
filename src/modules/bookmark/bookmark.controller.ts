import {
  Controller,
  Res,
  HttpStatus,
  Get,
  Post,
  Body,
  UseInterceptors,
  Param,
  UseGuards,
  Headers
} from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { BookmarkDTO } from '../../dto/bookmark.dto';
import { AuthGuard } from '@nestjs/passport';

import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@ApiTags('Bookmarks')
@Controller('bookmark')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}
  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getAllBookmark(@Res() res, @Headers() headers) {
    const bookmarks = await this.bookmarkService.getAllBookmark(headers.authorization);
    return res.status(HttpStatus.OK).json(bookmarks);
  }
  @Post(':idPost')
  @UseGuards(AuthGuard('jwt'))
  async addBookmark(
    @Res() res,
    @Param('idPost') idPost: any, 
    @Body() body: any, 
    @Headers() headers
  ) {
    const result = await this.bookmarkService.addBookmark(headers.authorization, idPost, body.idUser);
    return res.status(HttpStatus.OK).json(result);
  }
}
