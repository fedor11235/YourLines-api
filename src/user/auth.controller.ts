import {
  Controller,
  Res,
  HttpStatus,
  Post,
  Body,
  UseInterceptors,
  // Req,
  // UseGuards,
  // Session,
} from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';
import { RegistrationDTO } from './dto/registration.dto';
import { FileInterceptor } from '@nestjs/platform-express';
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
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: AuthDTO })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Post('login')
  @UseInterceptors(FileInterceptor('formdata'))
  // @UseGuards(AuthGuard("api-key"))
  async loginUser(@Res() res, @Body() authDTO: AuthDTO) {
    const user = await this.authService.loginUser(authDTO);
    return res.status(HttpStatus.OK).json(user);
  }

  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: AuthDTO })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  // @FormDataRequest()
  @Post('registry')
  @UseInterceptors(FileInterceptor('formdata'))
  // @UseGuards(AuthGuard("api-key"))
  async registryUser(@Res() res, @Body() registrationDTO: RegistrationDTO) {
    const user = await this.authService.registryUser(registrationDTO);
    res.cookie(process.env.COOKIE_KEY, process.env.VALUE);
    return res.status(HttpStatus.OK).json(user);
  }
}
