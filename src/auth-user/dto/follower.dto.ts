import { ApiProperty } from '@nestjs/swagger';

export class FollowerDTO {
  @ApiProperty({ description: 'id user', nullable: false })
  id: string;
  @ApiProperty({ description: 'id follower', nullable: false })
  follower: string;
}
