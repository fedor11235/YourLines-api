import { ApiProperty } from '@nestjs/swagger';
import { PostDTO } from './post.dto'

export class PostsDTO {
  @ApiProperty({ description: 'all posts', nullable: false })
  posts: Array<PostDTO>;
}
