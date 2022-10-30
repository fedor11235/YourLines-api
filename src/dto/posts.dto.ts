import { ApiProperty } from '@nestjs/swagger';
import { PostDTO } from './post.dto';

export class PostsDTO {
  @ApiProperty({ description: 'all posts' })
  posts: Array<PostDTO>;
}
