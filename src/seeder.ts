import { seeder } from 'nestjs-seeder';
import { CategoriesSeeder } from './categories/seeder/categories.seeder';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from './categories/schemas/category.schema';

seeder({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/learn_nestjs'),
    MongooseModule.forFeature([{ name: 'Categories', schema: CategorySchema }]),
  ],
}).run([CategoriesSeeder]);
