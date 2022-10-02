import * as mongoose from 'mongoose';

export const PostSchema = new mongoose.Schema({
  image: Object,
  header: String,
  description: String,
  comments: Array<string>,
});
