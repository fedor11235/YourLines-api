import { Document } from 'mongoose';

export interface Auth extends Document {
  readonly login: string;
  readonly password: string;
  readonly exists: boolean;

  readonly nickname: string;
  readonly link: string;
  readonly description: string;
  readonly webSite: string;
  readonly wishList: string;
  readonly avatar: string;
  readonly headerImage: string;

  readonly follower: Array<string>;
  readonly following: Array<string>;
}
