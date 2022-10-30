import { ApiProperty } from '@nestjs/swagger';

export class AuthDTO {
  @ApiProperty({ description: 'User login' })
  login: string;

  @ApiProperty({
    description: 'User password',
    required: true,
  })
  password: string;
}
