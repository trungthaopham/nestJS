import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ required: false })
  username: string;

  @Prop({ required: false })
  age?: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
