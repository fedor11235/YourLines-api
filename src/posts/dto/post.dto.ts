import { ApiProperty } from '@nestjs/swagger';

export class PostDTO {
  @ApiProperty({ description: 'image', nullable: false })
  image: any;

  @ApiProperty({ description: 'header', nullable: false })
  header: string;

  @ApiProperty({ description: 'description', nullable: false })
  description: string;

  @ApiProperty({ description: 'comments', nullable: false })
  comments: Array<string>;
}
