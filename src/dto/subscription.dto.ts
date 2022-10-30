import { ApiProperty } from '@nestjs/swagger';

export class SubscriptionDTO {
  @ApiProperty({ description: 'id user' })
  nickUser: string;

  @ApiProperty({ description: 'id subscriptions' })
  nickSubscriptions: string;
}
