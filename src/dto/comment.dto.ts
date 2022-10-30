import { ApiProperty } from '@nestjs/swagger';

export class CommentDTO {
  @ApiProperty({ description: 'text' })
  text: any;

  @ApiProperty({ description: 'user nickname' })
  user: any;

  @ApiProperty({ description: 'post id ' })
  post: any;
}
