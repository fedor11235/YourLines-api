import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
// import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDTO {
  // @IsEmail()
  @ApiProperty({ description: 'User' })
  token: string;
}
