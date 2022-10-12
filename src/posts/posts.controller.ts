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
import { PostDTO } from './dto/post.dto';
import { PostsDTO } from './dto/posts.dto';
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

  @ApiOperation({ summary: 'get all posts' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: PostsDTO,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Get()
  // @UseGuards(AuthGuard("api-key"))
  async getAllPosts(@Res() res) {
    const posts = await this.postsService.getAllPosts();
    return res.status(HttpStatus.OK).json({
      total: posts.length,
      posts: posts,
    });
  }

  @ApiOperation({ summary: 'Adding a post' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: PostDTO })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Post('add')
  @UseInterceptors(FileInterceptor('formdata'))
  // @UseInterceptors(FileInterceptor('file'))
  // @UseGuards(AuthGuard("api-key"))
  async addingPost(@Res() res, @Body() postDTO: PostDTO) {
    await this.postsService.addingPost(postDTO);
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
    });
  }

  @ApiOperation({ summary: 'Post editing' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: PostDTO })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Patch(':id')
  // @UseGuards(AuthGuard("api-key"))
  async editPost(
    @Res() res,
    @Param('id') id: string,
    @Body() postDTO: PostDTO,
  ) {
    await this.postsService.updatePost(postDTO, id);
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
    });
  }

  @ApiOperation({ summary: 'Deleting a post' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: PostDTO })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Delete(':id')
  // @UseGuards(AuthGuard("api-key"))
  async deletePost(@Res() res, @Param('id') id: string) {
    await this.postsService.deletePost(id);
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
    });
  }
}
