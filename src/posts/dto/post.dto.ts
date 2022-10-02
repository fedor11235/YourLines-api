import { ApiProperty } from '@nestjs/swagger';

export class PostDTO {
  // @ApiProperty({ description: 'id', nullable: false })
  // id: String;

  @ApiProperty({ description: 'image', nullable: false })
  image: Object;

  @ApiProperty({ description: 'header', nullable: false })
  header: string

  @ApiProperty({ description: 'description', nullable: false })
  description: string

  @ApiProperty({ description: 'comments', nullable: false })
  comments: Array<String>
}
