import * as mongoose from 'mongoose';

export const AuthSchema = new mongoose.Schema({
  login: String,
  password: String,
});

// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';

// export type UserDocument = User & Document;

// @Schema()
// export class User {
//   @Prop({ required: true })
//   login: string;

//   @Prop({ required: true })
//   password: string;
// }

// export const UserSchema = SchemaFactory.createForClass(User);
