import { ApiProperty } from '@nestjs/swagger';

export class EditingDTO {
  @ApiProperty({ description: 'User email', nullable: true })
  email: string;

  @ApiProperty({ description: 'User password', nullable: true })
  password: string;

  @ApiProperty({ description: 'User nickname', nullable: true })
  nickname: string;

  @ApiProperty({ description: 'User link', nullable: true })
  link: string;

  @ApiProperty({ description: 'User description', nullable: true })
  description: string;

  @ApiProperty({ description: 'User web site', nullable: true })
  webSite: string;

  @ApiProperty({ description: 'User a wish list', nullable: true })
  wishList: string;

  @ApiProperty({ description: 'User avatar', nullable: true })
  avatar: string;

  @ApiProperty({ description: 'User header image', nullable: true })
  headerImage: string;
}
