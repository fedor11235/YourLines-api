import { ApiProperty } from '@nestjs/swagger';
// import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegistrationDTO {
  // @IsEmail()
  @ApiProperty({ description: 'User login', required: true })
  email: string;

  // @IsNotEmpty()
  @ApiProperty({
    description: 'User nickname',
    required: true,
  })
  nickname: string;

  // @IsNotEmpty()
  @ApiProperty({
    description: 'User password',
    required: true,
  })
  password: string;
}
