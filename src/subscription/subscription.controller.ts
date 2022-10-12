import {
  Controller,
  HttpStatus,
  Post,
  Get,
  Res,
  Body,
  Param,
} from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SubscriptionDTO } from './dto/subscription.dto';

@ApiTags('Subscription')
@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @ApiOperation({ summary: 'Get list of subscriptions' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Get('subscriptions/:id')
  async getSubscriptions(@Res() res, @Param('id') id: string) {
    const result = await this.subscriptionService.getSubscriptions(id);
    return res.status(HttpStatus.OK).json(result);
  }

  @ApiOperation({ summary: 'Get list of subscribers' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Get('subscribers/:id')
  async getSubscribers(@Res() res, @Param('id') id: string) {
    const result = await this.subscriptionService.getSubscribers(id);
    return res.status(HttpStatus.OK).json(result);
  }

  @ApiOperation({ summary: 'Follow user' })
  @Post('subscribe')
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async subscribe(@Res() res, @Body() subscriptionDTO: SubscriptionDTO) {
    const result = await this.subscriptionService.subscribe(subscriptionDTO);
    return res.status(HttpStatus.OK).json(result);
  }
}
