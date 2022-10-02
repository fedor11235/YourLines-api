import { Document } from 'mongoose';

export interface Auth extends Document {
  readonly login: string;
  readonly password: string;
  readonly exists: boolean;
}
