import { Document } from 'mongoose';

export interface Post extends Document {
  readonly id: String;
  readonly image: Object;
  readonly header: String;
  readonly description: String;
  readonly comments: Array<String>;
}
