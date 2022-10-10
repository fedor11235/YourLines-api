import { ApiProperty } from '@nestjs/swagger';

export class FollowingDTO {
  @ApiProperty({ description: 'id user', nullable: false })
  id: string;
}
