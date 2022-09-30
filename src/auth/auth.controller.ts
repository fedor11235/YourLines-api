import { Controller, Get, Res, HttpStatus, Param, NotFoundException, Post, Body, Query, Put, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreatePostDTO } from './dto/user-post.dto';
// import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipes';


@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Get('login')
    async loginUser() {
        const posts = await this.authService.loginUser();
        return posts;
    }

    @Get('registry')
    async registryUser(@Res() res) {
        const post = await this.authService.registryUser();
        return post;

    }

    // @Get('posts')
    // async getPosts(@Res() res) {
    //     const posts = await this.blogService.getPosts();
    //     return res.status(HttpStatus.OK).json(posts);
    // }

    // @Get('post/:postID')
    // async getPost(@Res() res, @Param('postID', new ValidateObjectId()) postID) {
    //     const post = await this.blogService.getPost(postID);
    //     if (!post) throw new NotFoundException('Post does not exist!');
    //     return res.status(HttpStatus.OK).json(post);

    // }

    // @Post('/post')
    // async addPost(@Res() res, @Body() createPostDTO: CreatePostDTO) {
    //     const newPost = await this.blogService.addPost(createPostDTO);
    //     return res.status(HttpStatus.OK).json({
    //         message: "Post has been submitted successfully!",
    //         post: newPost
    //     })
    // }
}
