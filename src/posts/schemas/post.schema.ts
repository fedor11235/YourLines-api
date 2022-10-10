import * as mongoose from 'mongoose';

export const PostSchema = new mongoose.Schema({
  image: Object,
  header: String,
  date: String,
  time: String,
  comments: Array<string>,
});
