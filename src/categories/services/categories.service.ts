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

  async create(newCategory: CategoryDto): Promise<Category> {
    try {
      return await this.categoryModel.create(newCategory);
    } catch (error) {
      throw new HttpException('not created', HttpStatus.BAD_REQUEST);
    }
  }

  async getAll(options?): Promise<Category[]> {
    if (options) {
      return await this.categoryModel.find(options);
    }
    return await this.categoryModel.find(options);
  }

  async getById(id: string): Promise<Category> {
    return await this.categoryModel.findById(id);
  }

  async update(id: string, data: CategoryDto): Promise<Category> {
    return await this.categoryModel.findByIdAndUpdate(id, data);
  }

  async delete(id: string): Promise<Category> {
    return await this.categoryModel.findByIdAndUpdate(id, { isDeleted: true });
  }

  async getByCondition(query: any, conditions?: any): Promise<Category[]> {
    if (conditions) {
      return await this.categoryModel.find(query).populate(conditions);
    } else {
      return await this.categoryModel.find(query);
    }
  }
}
