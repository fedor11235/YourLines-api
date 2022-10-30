import { ApiProperty } from '@nestjs/swagger';

export class MessagesDTO {
  @ApiProperty({ description: 'text' })
  text: any;

  @ApiProperty({ description: 'recipient id ' })
  recipient: any;
}
