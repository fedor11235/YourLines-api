import * as mongoose from 'mongoose';

export const AuthSchema = new mongoose.Schema({
  login: String,
  password: String,

  link: String,
  description: String,
  webSite: String,
  wishList: String,
  avatar: String,
  headerImage: String,
});
