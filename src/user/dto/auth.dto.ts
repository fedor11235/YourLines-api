import { ApiProperty } from '@nestjs/swagger';
// import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthDTO {
  // @IsEmail()
  @ApiProperty({ description: 'User login', required: true })
  email: string;

  // @IsNotEmpty()
  @ApiProperty({
    description: 'User password',
    required: true,
  })
  password: string;
}
