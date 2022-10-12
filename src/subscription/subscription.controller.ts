import { Controller, HttpStatus, Post, Get, Res, Body } from '@nestjs/common';
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
  @Get('subscribers')
  getSubscriptions() {
    return this.subscriptionService.getSubscriptions();
  }

  @ApiOperation({ summary: 'Get list of subscribers' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Get('subscribers')
  getSubscribers() {
    return this.subscriptionService.getSubscribers();
  }

  @Post('subscribe')
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  subscribe(@Res() res, @Body() subscriptionDTO: SubscriptionDTO) {
    return this.subscriptionService.subscribe(subscriptionDTO);
  }
}
