import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductDto } from '../dto/product.dto';
import { Product } from '../schemas/product.schema';
import { ProductService } from '../services/product/product.service';
import { CategoriesService } from '../../categories/services/categories.service';

@ApiTags('Products')
@ApiBearerAuth()
@Controller('product')
export class ProductController {
  constructor(
    private productService: ProductService,
    private categoryService: CategoriesService,
  ) {}

  @ApiOperation({ summary: 'create new product' })
  @Post('/')
  async create(@Body() product: ProductDto): Promise<Product> {
    const checkCategory = await this.categoryService.getByCondition({
      _id: { $in: product.categoryId },
    });
    if (checkCategory) {
      return await this.productService.create(product);
    } else {
      throw new HttpException('not created', HttpStatus.BAD_REQUEST);
    }
  }

  @ApiOperation({ summary: 'get all product' })
  @Get('/')
  async getAll(): Promise<ProductDto[]> {
    return this.productService.getAll();
  }

  @ApiOperation({ summary: 'get product by id' })
  @Get('/:id')
  async getById(@Param('id') id: string): Promise<ProductDto> {
    return this.productService.getById(id);
  }

  @ApiOperation({ summary: 'update product by id' })
  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() product: ProductDto,
  ): Promise<ProductDto> {
    const checkCategory = await this.categoryService.getByCondition({
      _id: { $in: product.categoryId },
    });
    if (checkCategory) {
      return await this.productService.update(id, product);
    } else {
      throw new HttpException('not updated', HttpStatus.BAD_REQUEST);
    }
  }

  @ApiOperation({ summary: 'get product by id' })
  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<ProductDto> {
    return await this.productService.delete(id);
  }
}
