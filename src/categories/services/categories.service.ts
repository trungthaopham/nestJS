import { HttpStatus, Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from '../schemas/category.schema';
import { CategoryDto } from '../dto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Categories') private categoryModel: Model<CategoryDocument>,
  ) {}

  async create(newCategory: CategoryDto): Promise<CategoryDto> {
    try {
      return await this.categoryModel.create(newCategory);
    } catch (error) {
      throw new HttpException('not created', HttpStatus.BAD_REQUEST);
    }
  }
}
