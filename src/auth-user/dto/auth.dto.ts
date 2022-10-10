import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthDTO {
  // @IsEmail()
  @ApiProperty({ description: 'User login', nullable: false })
  login: string;

  // @IsNotEmpty()
  @ApiProperty({ description: 'User password', nullable: false })
  password: string;
}
