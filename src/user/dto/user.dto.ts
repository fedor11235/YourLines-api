import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entity/user.entity';
// import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDTO {
  // @IsEmail()
  @ApiProperty({ description: 'User' })
  token: string;
}
