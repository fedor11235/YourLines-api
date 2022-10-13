import {
  Controller,
  Res,
  HttpStatus,
  Post,
  Delete,
  Body,
  Get,
  Patch,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentDTO } from './dto/comment.dto';

import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse,
  // ApiSecurity,
} from '@nestjs/swagger';

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
}
