import { ApiProperty } from '@nestjs/swagger';
import { Post } from './post.interface';

export class Posts {
  posts: Array<Post>
}