import { ApiProperty } from '@nestjs/swagger';

export class RegistrationDTO {
  @ApiProperty({ description: 'User login', required: true })
  email: string;

  @ApiProperty({
    description: 'User nickname',
    required: true,
  })
  nickname: string;

  @ApiProperty({
    description: 'User password',
    required: true,
  })
  password: string;
}
