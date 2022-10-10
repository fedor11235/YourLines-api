import { Document } from 'mongoose';

export interface Auth extends Document {
  readonly login: string;
  readonly password: string;
  readonly exists: boolean;

  readonly link: string;
  readonly description: string;
  readonly webSite: string;
  readonly wishList: string;
  readonly avatar: string;
  readonly headerImage: string;
}
