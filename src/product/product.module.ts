import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from 'src/categories/models/category.model';
import { CategoriesService } from 'src/categories/services/categories.service';
import { ProductController } from './controller/product.controller';
import { ProductSchema } from './schemas/product.schema';
import { ProductService } from './services/product/product.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Products', schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: 'Categories', schema: CategorySchema }]),
  ],
  providers: [ProductService, CategoriesService],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
