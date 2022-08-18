import { Schema } from 'mongoose';
import * as mongoose from 'mongoose';

const ProductSchema = new Schema(
  {
    name: String,
    description: String,
    categoryId: [{ type: mongoose.Types.ObjectId }],
    price: {
      type: Number,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: 'products',
  },
);

export { ProductSchema };
