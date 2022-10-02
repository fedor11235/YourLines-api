import { Document } from 'mongoose';
import { Post } from './post.interface';

export class Posts extends Document {
  posts: Array<Post>;
}
