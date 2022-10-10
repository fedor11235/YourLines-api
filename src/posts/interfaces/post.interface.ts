import { Document } from 'mongoose';

export interface Post extends Document {
  readonly id: string;
  readonly image: any;
  readonly header: string;
  readonly date: string;
  readonly time: string;
  readonly description: string;
  readonly comments: Array<string>;
}
