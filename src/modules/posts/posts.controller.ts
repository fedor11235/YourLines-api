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
  // UseGuards,
} from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { PostsService } from './posts.service';
import { PostDTO } from '../../dto/post.dto';
import { PostsDTO } from '../../dto/posts.dto';
import { FileInterceptor } from '@nestjs/platform-express';

import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse,
  // ApiSecurity,
} from '@nestjs/swagger';
// import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipes';

@ApiTags('Posts')
// @ApiSecurity("X-API-KEY", ["X-API-KEY"])
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  // @UseGuards(AuthGuard("api-key"))
  async getAllPosts(@Res() res) {
    const posts = await this.postsService.getAllPosts();
    return res.status(HttpStatus.OK).json({
      total: posts.length,
      posts: posts,
    });
  }

  @Get('user/:id')
  // @UseGuards(AuthGuard("api-key"))
  async getAllUserPosts(@Res() res, @Param('id') id: any) {
    const posts = await this.postsService.getAllUserPosts(id);
    return res.status(HttpStatus.OK).json({
      total: posts.length,
      posts: posts,
    });
  }

  @Post('add/:id')
  @UseInterceptors(FileInterceptor('formdata'))
  // @UseInterceptors(FileInterceptor('file'))
  // @UseGuards(AuthGuard("api-key"))
  async addingPost(@Res() res, @Param('id') id: any, @Body() postDTO: PostDTO) {
    await this.postsService.addingPost(postDTO, id);
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
    });
  }

  @Patch(':id')
  // @UseGuards(AuthGuard("api-key"))
  async editPost(@Res() res, @Param('id') id: any, @Body() postDTO: PostDTO) {
    await this.postsService.updatePost(postDTO, id);
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
    });
  }

  @Delete(':id')
  // @UseGuards(AuthGuard("api-key"))
  async deletePost(@Res() res, @Param('id') id: any) {
    await this.postsService.deletePost(id);
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
    });
  }
}
