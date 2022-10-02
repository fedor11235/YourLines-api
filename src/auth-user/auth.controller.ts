import {
  Controller,
  Res,
  HttpStatus,
  Post,
  Body,
  // Req,
  // UseGuards,
  // Session,
} from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';

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
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: AuthDTO })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Post('login')
  // @UseGuards(AuthGuard("api-key"))
  async loginUser(@Res() res, @Body() authDTO: AuthDTO) {
    const userExist = await this.authService.loginUser(authDTO);
    if (userExist) {
      res.cookie(process.env.COOKIE_KEY, process.env.COOKIE_VALUE);
      return res.status(HttpStatus.OK).json({
        message: 'You are logged in!',
        user: authDTO.login,
      });
    }
    return res.status(HttpStatus.OK).json({
      message: 'This user does not exist!',
      user: authDTO.login,
    });
  }

  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: AuthDTO })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Post('registry')
  // @UseGuards(AuthGuard("api-key"))
  async registryUser(@Res() res, @Body() authDTO: AuthDTO) {
    const userExist = await this.authService.registryUser(authDTO);
    if (userExist) {
      return res.status(HttpStatus.OK).json({
        message: 'User exists!',
        user: authDTO.login,
      });
    }
    res.cookie(process.env.COOKIE_KEY, process.env.VALUE);
    return res.status(HttpStatus.OK).json({
      message: 'User created!',
      user: authDTO.login,
    });
  }
}
