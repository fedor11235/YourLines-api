import { Controller, Res, HttpStatus, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDTO } from './dto/user-post.dto';
import { User } from './entities/user.entities';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiSecurity } from '@nestjs/swagger';
// import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipes';

@ApiTags('Auth')
@ApiSecurity("X-API-KEY", ["X-API-KEY"])
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @ApiOperation({ summary: 'Login user' })
    @ApiParam({ name: "password", required: true })
    @ApiParam({ name: "login", required: true })
    @ApiResponse({ status: HttpStatus.OK, description: "Success", type: User })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
    @Post('login')
    @UseGuards(AuthGuard("api-key"))
    async getPost(@Res() res, @Body() createUserDTO: CreateUserDTO) {
        const user = await this.authService.loginUser(createUserDTO);
        return res.status(HttpStatus.OK).json({
            message: 'User login!',
            post: user
        })
    }

    @ApiOperation({ summary: 'Login user' })
    @ApiParam({ name: "password", required: true })
    @ApiParam({ name: "login", required: true })
    @ApiResponse({ status: HttpStatus.OK, description: "Success", type: User })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
    @Post('registry')
    @UseGuards(AuthGuard("api-key"))
    async addPost(@Res() res, @Body() createUserDTO: CreateUserDTO) {
        const newUser = await this.authService.loginUser(createUserDTO);
        return res.status(HttpStatus.OK).json({
            message: "User created!",
            post: newUser
        })
    }
}
