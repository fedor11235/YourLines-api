import {
  Controller,
  Res,
  HttpStatus,
  Post,
  Body,
  UseInterceptors,
  Get,
  // Req,
  // UseGuards,
  // Session,
} from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { SubscriptionsService } from './subscriptions.service';
import { FollowerDTO } from './dto/follower.dto';
import { FollowingDTO } from './dto/following.dto';
import { FileInterceptor } from '@nestjs/platform-express';
// import { FormDataRequest } from 'nestjs-form-data';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  // ApiSecurity,
} from '@nestjs/swagger';

@ApiTags('Subscriptions')
// @ApiSecurity("X-API-KEY", ["X-API-KEY"])
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private subscriptionsService: SubscriptionsService) {}

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
    const allSubscribers = await this.subscriptionsService.getAllSubscribers(
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
    await this.subscriptionsService.subscribe(followerDTO);
    return res.status(HttpStatus.OK).json('ok');
  }
}
