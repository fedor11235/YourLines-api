import { ApiProperty } from '@nestjs/swagger';
// import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegistrationDTO {
  // @IsEmail()
  @ApiProperty({ description: 'User login', nullable: false, required: true })
  email: string;

  // @IsNotEmpty()
  @ApiProperty({
    description: 'User nickname',
    nullable: false,
    required: true,
  })
  nickname: string;

  // @IsNotEmpty()
  @ApiProperty({
    description: 'User password',
    nullable: false,
    required: true,
  })
  password: string;
}
