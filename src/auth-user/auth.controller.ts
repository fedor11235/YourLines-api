import {
  Controller,
  Res,
  HttpStatus,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserDTO } from './dto/user-post.dto';
// import { User } from './entities/user.entities';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiSecurity,
} from '@nestjs/swagger';
// import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipes';

@ApiTags('Auth')
// @ApiSecurity("X-API-KEY", ["X-API-KEY"])
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login user' })
  // @ApiParam({ name: "password", required: true })
  // @ApiParam({ name: "login", required: true })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: UserDTO })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Post('login')
  // @UseGuards(AuthGuard("api-key"))
  async loginUser(@Res() res, @Body() userDTO: UserDTO) {
    const user = await this.authService.loginUser(userDTO);
    if (user.exists) {
      delete user.exists;
      return res.status(HttpStatus.OK).json({
        message: 'You are logged in!',
        user: user,
      });
    }
    delete user.exists;
    return res.status(HttpStatus.OK).json({
      message: 'This user does not exist!',
      user: user,
    });
  }

  @ApiOperation({ summary: 'Login user' })
  // @ApiParam({ name: "password", required: true })
  // @ApiParam({ name: "login", required: true })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: UserDTO })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Post('registry')
  // @UseGuards(AuthGuard("api-key"))
  async registryUser(@Res() res, @Body() userDTO: UserDTO) {
    const newUser = await this.authService.registryUser(userDTO);
    if (newUser.exists) {
      delete newUser.exists;
      return res.status(HttpStatus.OK).json({
        message: 'User exists!',
        user: newUser,
      });
    }
    delete newUser.exists;
    return res.status(HttpStatus.OK).json({
      message: 'User created!',
      user: newUser,
    });
  }
}
