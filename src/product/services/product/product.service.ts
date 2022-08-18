import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDto } from 'src/product/dto/product.dto';
import { Product, ProductDocument } from 'src/product/schemas/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Products') private productModel: Model<ProductDocument>,
  ) {}

  async create(newProduct: ProductDto): Promise<Product> {
    try {
      return await this.productModel.create(newProduct);
    } catch (error) {
      throw new HttpException('not created', HttpStatus.BAD_REQUEST);
    }
  }

  async getAll(): Promise<Product[]> {
    return await this.productModel.find();
  }

  async getById(id: string): Promise<Product> {
    return await this.productModel.findById(id);
  }

  async update(id: string, data: ProductDto): Promise<Product> {
    return await this.productModel.findByIdAndUpdate(id, data);
  }

  async delete(id: string): Promise<Product> {
    return await this.productModel.findByIdAndUpdate(id, { isDeleted: true });
  }
}
