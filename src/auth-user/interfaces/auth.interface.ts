import { Document } from 'mongoose';

export interface Auth extends Document {
  readonly login: String;
  readonly password: String;
  readonly exists: Boolean;
}
