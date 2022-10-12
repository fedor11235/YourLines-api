import { ApiProperty } from '@nestjs/swagger';

export class PostDTO {
  @ApiProperty({ description: 'image', nullable: true })
  image: any;

  @ApiProperty({ description: 'header', nullable: true })
  header: string;

  @ApiProperty({ description: 'description', nullable: true })
  description: string;

  @ApiProperty({ description: 'comments', nullable: true })
  comments: Array<string>;
}
