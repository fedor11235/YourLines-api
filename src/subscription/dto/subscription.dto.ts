import { ApiProperty } from '@nestjs/swagger';

export class SubscriptionDTO {
  @ApiProperty({ description: 'id user', nullable: true })
  nickUser: string;

  @ApiProperty({ description: 'id subscriptions', nullable: true })
  nickSubscriptions: string;
}
