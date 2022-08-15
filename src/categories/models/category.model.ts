import { Schema } from 'mongoose';

const CategorySchema = new Schema(
  {
    name: String,
    description: String,
  },
  {
    timestamps: true,
    collection: 'categories',
  },
);

export { CategorySchema };

export interface CategoryI {
  _id?: string;
  name?: string;
  description?: string;
}
