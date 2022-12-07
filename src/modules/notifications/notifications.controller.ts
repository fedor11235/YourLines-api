import { Controller, Get, Headers } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @ApiOperation({ summary: 'Login user' })
  @Get('view')
  async loginUser(@Headers() headers) {
    this.notificationsService.viewedNotifications(headers.authorization);
  }
}
