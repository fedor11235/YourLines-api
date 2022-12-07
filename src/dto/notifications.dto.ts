import { ApiProperty } from '@nestjs/swagger';

export class NotificationsDTO {
  @ApiProperty({ description: 'user from id' })
  userFromId: string;

  @ApiProperty({ description: 'user to id' })
  userToId: string;

  @ApiProperty({ description: 'type' })
  type: string;

  @ApiProperty({ description: 'info' })
  info: string;
}
