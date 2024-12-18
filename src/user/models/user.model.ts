import { Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  {
    timestamps: true,
    collection: 'users',
  },
);

export { UserSchema };
