import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Factory } from 'nestjs-seeder';

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true })
export class Category {
  @Factory((faker) => faker.lorem.words(2))
  @Prop()
  name: string;

  @Factory((faker) => faker.lorem.words(10))
  @Prop()
  description: string;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
