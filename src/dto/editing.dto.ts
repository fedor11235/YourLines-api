import { ApiProperty } from '@nestjs/swagger';

export class EditingDTO {
  @ApiProperty({ description: 'User email' })
  email: string;

  @ApiProperty({ description: 'User password' })
  password: string;

  @ApiProperty({ description: 'User nickname' })
  nickname: string;

  @ApiProperty({ description: 'User link' })
  link: string;

  @ApiProperty({ description: 'User description' })
  description: string;

  @ApiProperty({ description: 'User web site' })
  webSite: string;

  @ApiProperty({ description: 'User a wish list' })
  wishList: string;

  @ApiProperty({ description: 'User avatar' })
  avatar: string;

  @ApiProperty({ description: 'User header image' })
  headerImage: string;
}
