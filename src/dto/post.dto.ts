import { ApiProperty } from '@nestjs/swagger';

export class PostDTO {
  @ApiProperty({ description: 'image' })
  image: any;

  @ApiProperty({ description: 'header' })
  header: string;

  @ApiProperty({ description: 'description' })
  description: string;

  @ApiProperty({ description: 'comments' })
  comments: Array<string>;
}
