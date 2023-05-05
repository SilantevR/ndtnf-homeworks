import { Schema, model } from 'mongoose';

const BookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  authors: {
    type: String,
    required: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  fileCover: {
    type: String,
  },
  fileName: {
    type: String,
  },
  comments: [
    {
      comment: String,
      user: { _id: String, username: String },
    },
  ],
});

export const BookModel = model('Book', BookSchema);
