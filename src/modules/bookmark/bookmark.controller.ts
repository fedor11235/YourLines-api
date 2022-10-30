import {
  Controller,
  Res,
  HttpStatus,
  Get,
  Post,
  Body,
  UseInterceptors,
  Param,
} from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { BookmarkDTO } from '../../dto/bookmark.dto';

import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@ApiTags('Bookmarks')
@Controller('bookmarks')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}
  @Get()
  async getAllBookmark(@Res() res) {
    const bookmarkAll = await this.bookmarkService.getAllBookmark();
    return res.status(HttpStatus.OK).json(bookmarkAll);
  }
  @Post(':id')
  async addBookmark(@Res() res, @Param('id') id: any, @Body() editingDTO: BookmarkDTO) {
    const result = await this.bookmarkService.addBookmark(editingDTO, id);
    return res.status(HttpStatus.OK).json(result);
  }
}
