import { ApiProperty } from '@nestjs/swagger';

export class EditingDTO {
  @ApiProperty({ description: 'User nickname', nullable: false })
  login: string;

  @ApiProperty({ description: 'User link', nullable: false })
  link: string;

  @ApiProperty({ description: 'User description', nullable: false })
  description: string;

  @ApiProperty({ description: 'User web site', nullable: false })
  webSite: string;

  @ApiProperty({ description: 'User a wish list', nullable: false })
  wishList: string;

  @ApiProperty({ description: 'User avatar', nullable: false })
  avatar: string;

  @ApiProperty({ description: 'User header image', nullable: false })
  headerImage: string;
}
