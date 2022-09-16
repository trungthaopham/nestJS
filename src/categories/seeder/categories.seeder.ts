import { DataFactory, Seeder } from 'nestjs-seeder';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from '../schemas/category.schema';
import { Model } from 'mongoose';

export class CategoriesSeeder implements Seeder {
  constructor(
    @InjectModel('Categories') private categoryModel: Model<CategoryDocument>,
  ) {}

  drop(): Promise<any> {
    return this.categoryModel.deleteMany({}) as any;
  }

  seed(): Promise<any> {
    const products: any = DataFactory.createForClass(Category).generate(20);

    return this.categoryModel.insertMany(products);
  }
}
