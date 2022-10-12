import { ApiProperty } from '@nestjs/swagger';

export class SubscriptionDTO {
  @ApiProperty({ description: 'id user', nullable: true })
  id: number;

  @ApiProperty({ description: 'id subscriptions', nullable: true })
  idSubscriptions: number;
}
