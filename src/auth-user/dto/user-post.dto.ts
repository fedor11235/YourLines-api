import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
  @ApiProperty({ description: 'User login', nullable: false })
  login: string;

  @ApiProperty({ description: 'User password', nullable: false })
  password: string;
}
