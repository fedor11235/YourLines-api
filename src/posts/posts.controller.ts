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
    UseGuards,
  } from '@nestjs/common';
  import { AuthGuard } from '@nestjs/passport';
  import { PostsService } from './posts.service';
  import { PostDTO } from './dto/post.dto';
  import { PostsDTO } from './dto/posts.dto';

  import {
    ApiTags,
    ApiOperation,
    ApiParam,
    ApiResponse,
    ApiSecurity,
  } from '@nestjs/swagger';
  // import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipes';
  
  @ApiTags('posts')
  // @ApiSecurity("X-API-KEY", ["X-API-KEY"])
  @Controller('posts')
  export class PostsController {
    constructor(private postsService: PostsService) {}

    @ApiOperation({ summary: 'get all posts' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: PostsDTO })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
    @Get()
    // @UseGuards(AuthGuard("api-key"))
    async getAllPosts(@Res() res) {
      const posts = await this.postsService.getAllPosts();
      return res.status(HttpStatus.OK).json({
        message: 'Get all posts!',
        total: posts.length,
        posts: posts,
      });
    }
  
    @ApiOperation({ summary: 'Adding a post' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: PostDTO })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
    @Post('add')
    // @UseGuards(AuthGuard("api-key"))
    async addingPost(@Res() res, @Body() postDTO: PostDTO) {
      const post = await this.postsService.addingPost(postDTO);
      return res.status(HttpStatus.OK).json({
        message: 'Post created!',
        post: post,
      });
    }

    @ApiOperation({ summary: 'Post editing' })
    @ApiParam({ name: "id", required: true })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: PostDTO })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
    @Patch(':id')
    // @UseGuards(AuthGuard("api-key"))
    async editPost(@Res() res, @Param('id') id: String, @Body() postDTO: PostDTO) {
      const post = await this.postsService.updatePost(postDTO, id);
      return res.status(HttpStatus.OK).json({
        message: 'Post update!',
        post: post,
      });
    }

    @ApiOperation({ summary: 'Deleting a post' })
    @ApiParam({ name: "id", required: true })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: PostDTO })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
    @Delete(':id')
    // @UseGuards(AuthGuard("api-key"))
    async deletePost(@Res() res, @Param('id') id: String) {
      const post = await this.postsService.deletePost(id);
      return res.status(HttpStatus.OK).json({
        message: 'Post delete!',
        post: post,
      });
  }
}
  
