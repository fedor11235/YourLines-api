import {
  Controller,
  Res,
  HttpStatus,
  Get,
  Param,
  Post,
  Body,
  UseInterceptors,
  Delete,
  Req,
  Request,
  Headers,
  // Req,
  UseGuards,
  // Session,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';
import { UserDTO } from './dto/user.dto';
import { RegistrationDTO } from './dto/registration.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtService } from '@nestjs/jwt';
// import { FormDataRequest } from 'nestjs-form-data';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  // ApiSecurity,
} from '@nestjs/swagger';
// import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipes';

@ApiTags('Auth')
// @ApiSecurity("X-API-KEY", ["X-API-KEY"])
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @ApiOperation({ summary: 'Login user' })
  @Post('login')
  @UseInterceptors(FileInterceptor('formdata'))
  async loginUser(@Res() res, @Body() authDTO: AuthDTO) {
    const userLog = await this.authService.loginUser(authDTO);
    return res.status(HttpStatus.OK).json(userLog);
  }

  @ApiOperation({ summary: 'Login user' })
  @Post('registry')
  @UseInterceptors(FileInterceptor('formdata'))
  async registryUser(@Res() res, @Body() registrationDTO: RegistrationDTO) {
    const userReg = await this.authService.registryUser(registrationDTO);
    return res.status(HttpStatus.OK).json(userReg);
  }

  @Get('user')
  @UseInterceptors(FileInterceptor('formdata'))
  async getUser(@Res() res, @Headers() headers) {
    const user = await this.authService.getUser(headers.authorization);
    return res.status(HttpStatus.OK).json(user);
  }

  @Get('refresh')
  async userRefreshToken(@Res() res, @Headers() headers, @Req() req) {
    const token = await this.authService.userRefreshToken(headers.authorization);
    return res.status(HttpStatus.OK).json(token);
  }

  @Delete('logout')
  @UseInterceptors(FileInterceptor('formdata'))
  async deleteUser(@Res() res, @Headers() headers) {
    await this.authService.deleteUser(headers.authorization);
    return res.status(HttpStatus.OK).json('ok');
  }
}
