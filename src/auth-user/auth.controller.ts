import {
  Controller,
  Res,
  HttpStatus,
  Post,
  Put,
  Body,
  UseInterceptors,
  Param,
  // Req,
  // UseGuards,
  // Session,
} from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';
import { EditingDTO } from './dto/editing.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FormDataRequest } from 'nestjs-form-data';

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
  @UseInterceptors(FileInterceptor('formdata'))
  // @UseGuards(AuthGuard("api-key"))
  async loginUser(@Res() res, @Body() authDTO: AuthDTO) {
    const userExist = await this.authService.loginUser(authDTO);
    if (userExist) {
      res.cookie(process.env.COOKIE_KEY, process.env.COOKIE_VALUE);
      return res.status(HttpStatus.OK).json({
        login: true,
        user: authDTO.login,
      });
    }
    return res.status(HttpStatus.OK).json({
      login: false,
      user: authDTO.login,
    });
  }

  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: AuthDTO })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  // @FormDataRequest()
  @Post('registry')
  @UseInterceptors(FileInterceptor('formdata'))
  // @UseGuards(AuthGuard("api-key"))
  async registryUser(@Res() res, @Body() authDTO: AuthDTO) {
    const userExist = await this.authService.registryUser(authDTO);
    if (userExist) {
      return res.status(HttpStatus.OK).json({
        user: authDTO.login,
        registry: false,
      });
    }
    res.cookie(process.env.COOKIE_KEY, process.env.VALUE);
    return res.status(HttpStatus.OK).json({
      user: authDTO.login,
      registry: true,
    });
  }
}

@ApiTags('User')
// @ApiSecurity("X-API-KEY", ["X-API-KEY"])
@Controller('user')
export class UserController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Editing user' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: AuthDTO })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  // @FormDataRequest()
  @Put(':id')
  @UseInterceptors(FileInterceptor('formdata'))
  // @UseGuards(AuthGuard("api-key"))
  async editingUser(
    @Res() res,
    @Param('id') id: string,
    @Body() editingDTO: EditingDTO,
  ) {
    await this.authService.editing(editingDTO, id);
    return res.status(HttpStatus.OK).json('ok');
  }
}
