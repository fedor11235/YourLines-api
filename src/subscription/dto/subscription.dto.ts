import { ApiProperty } from '@nestjs/swagger';

export class SubscriptionDTO {
  @ApiProperty({ description: 'id user', nullable: true })
  id: string;

  @ApiProperty({ description: 'id subscriptions', nullable: true })
  idSubscriptions: string;
}
