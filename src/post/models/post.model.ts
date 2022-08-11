import { Schema, Document } from 'mongoose';

const PostSchema = new Schema(
  {
    title: String,
    description: String,
    content: String,
    // created_at: { type: Date, required: true, default: Date.now },
  },
  {
    timestamps: true,
    collection: 'posts',
  },
);

export { PostSchema };

export interface Post extends Document {
  title: string;
  description: string;
  content: string;
}
