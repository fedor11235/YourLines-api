import {
  Controller,
  Res,
  HttpStatus,
  Post,
  Put,
  Body,
  UseInterceptors,
  Param,
  Get,
  // Req,
  // UseGuards,
  // Session,
} from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';
import { EditingDTO } from './dto/editing.dto';
import { RegistrationDTO } from './dto/registration.dto';
import { FollowerDTO } from './dto/follower.dto';
import { FollowingDTO } from './dto/following.dto';
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
  async registryUser(@Res() res, @Body() registrationDTO: RegistrationDTO) {
    const userExist = await this.authService.registryUser(registrationDTO);
    if (userExist) {
      return res.status(HttpStatus.OK).json({
        user: registrationDTO.login,
        registry: false,
      });
    }
    res.cookie(process.env.COOKIE_KEY, process.env.VALUE);
    return res.status(HttpStatus.OK).json({
      user: registrationDTO.login,
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
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: EditingDTO,
  })
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

@ApiTags('Subscriptions')
// @ApiSecurity("X-API-KEY", ["X-API-KEY"])
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Give a list of subscribers' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: FollowingDTO,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  // @FormDataRequest()
  @Get()
  @UseInterceptors(FileInterceptor('formdata'))
  // @UseGuards(AuthGuard("api-key"))
  async getAllSubscribers(@Res() res, followingDTO: FollowingDTO) {
    const allSubscribers = await this.authService.getAllSubscribers(
      followingDTO,
    );
    return res.status(HttpStatus.OK).json(allSubscribers);
  }

  @ApiOperation({ summary: 'Subscribe' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: FollowerDTO,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  // @FormDataRequest()
  @Post()
  @UseInterceptors(FileInterceptor('formdata'))
  // @UseGuards(AuthGuard("api-key"))
  async subscribe(@Res() res, @Body() followerDTO: FollowerDTO) {
    await this.authService.subscribe(followerDTO);
    return res.status(HttpStatus.OK).json('ok');
  }
}
