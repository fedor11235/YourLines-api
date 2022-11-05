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
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostDTO } from '../../dto/post.dto';
import { PostsDTO } from '../../dto/posts.dto';
import { FileInterceptor } from '@nestjs/platform-express';

import { ApiTags } from '@nestjs/swagger';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  async getAllPosts(@Res() res) {
    const posts = await this.postsService.getAllPosts();
    return res.status(HttpStatus.OK).json({
      total: posts.length,
      posts: posts,
    });
  }

  @Get('user/:id')
  async getAllUserPosts(@Res() res, @Param('id') id: any) {
    const posts = await this.postsService.getAllUserPosts(id);
    return res.status(HttpStatus.OK).json({
      total: posts.length,
      posts: posts,
    });
  }

  @Post('add/:id')
  @UseInterceptors(FileInterceptor('formdata'))
  async addingPost(@Res() res, @Param('id') id: any, @Body() postDTO: PostDTO) {
    await this.postsService.addingPost(postDTO, id);
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
    });
  }

  @Patch(':id')
  async editPost(@Res() res, @Param('id') id: any, @Body() postDTO: PostDTO) {
    await this.postsService.updatePost(postDTO, id);
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
    });
  }

  @Delete(':id')
  async deletePost(@Res() res, @Param('id') id: any) {
    await this.postsService.deletePost(id);
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
    });
  }
}
