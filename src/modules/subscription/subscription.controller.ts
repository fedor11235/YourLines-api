import {
  Controller,
  HttpStatus,
  Post,
  Get,
  Res,
  Body,
  Param,
  Headers,
} from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { SubscriptionDTO } from '../../dto/subscription.dto';

@ApiTags('Subscription')
@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get('subscriptions')
  async getSubscriptions(@Res() res, @Headers() headers) {
    const result = await this.subscriptionService.getSubscriptions(
      headers.authorization,
    );
    return res.status(HttpStatus.OK).json(result);
  }

  @Get('subscribers')
  async getSubscribers(@Res() res, @Headers() headers) {
    const result = await this.subscriptionService.getSubscribers(
      headers.authorization,
    );
    return res.status(HttpStatus.OK).json(result);
  }
  @Get('subscribe/:id')
  async subscribe(@Res() res, @Param('id') id: any, @Headers() headers) {
    const result = await this.subscriptionService.subscribe(
      headers.authorization,
      id,
    );
    return res.status(HttpStatus.OK).json(result);
  }
  @Get('check/:id')
  async check(@Res() res, @Param('id') id: any, @Headers() headers) {
    const result = await this.subscriptionService.check(
      headers.authorization,
      id,
    );
    return res.status(HttpStatus.OK).json(result);
  }

  @Get('unsubscribe/:id')
  async unsubscribe(@Res() res, @Param('id') id: any, @Headers() headers) {
    const result = await this.subscriptionService.unsubscribe(
      headers.authorization,
      id,
    );
    return res.status(HttpStatus.OK).json(result);
  }
}
