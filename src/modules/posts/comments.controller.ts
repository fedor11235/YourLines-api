import {
  Controller,
  Res,
  HttpStatus,
  Post,
  Body,
  Get,
  Param,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentDTO } from '../../dto/comment.dto';

import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @ApiOperation({ summary: 'leave a comment' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: CommentDTO,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Post()
  // @UseGuards(AuthGuard("api-key"))
  async putComment(@Res() res, @Body() commentDTO: CommentDTO) {
    const posts = await this.commentsService.putComment(commentDTO);
    return res.status(HttpStatus.OK).json({
      total: posts.length,
      posts: posts,
    });
  }

  @ApiOperation({ summary: 'Delete comment' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: CommentDTO,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Get(':id')
  // @UseGuards(AuthGuard("api-key"))
  async deleteComment(@Res() res, @Param('id') id: any) {
    const responDelete = await this.commentsService.deleteComment(id);
    return res.status(HttpStatus.OK).json(responDelete);
  }

  @ApiOperation({ summary: 'Add like' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: CommentDTO,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Get(':id')
  // @UseGuards(AuthGuard("api-key"))
  async addLike(@Res() res, @Param('id') id: any) {
    const responLike = await this.commentsService.addLike(id);
    return res.status(HttpStatus.OK).json(responLike);
  }
}
