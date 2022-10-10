import * as mongoose from 'mongoose';

export const AuthSchema = new mongoose.Schema({
  login: String,
  password: String,

  nickname: String,
  link: String,
  description: String,
  webSite: String,
  wishList: String,
  avatar: String,
  headerImage: String,

  follower: Array,
  following: Array,
});
