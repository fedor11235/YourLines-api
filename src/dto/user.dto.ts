import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
  @ApiProperty({ description: 'User' })
  token: string;
}
