import {
  Body,
  Param,
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import helper from '../../utils/helper';
import { CategoryDto } from '../dto/category.dto';
import { Category } from '../schemas/category.schema';
import { CategoriesService } from '../services/categories.service';

@ApiTags('Categories')
@ApiBearerAuth()
@Controller({ path: 'categories', version: '1' })
export class CategoriesController {
  constructor(private categoryService: CategoriesService) {}

  @ApiOperation({ summary: 'create new category' })
  @Post('/')
  async create(@Body() category: CategoryDto): Promise<Category> {
    return this.categoryService.create(category);
  }

  @ApiOperation({ summary: 'get all category' })
  @Get('/')
  async getAll(@Query() query): Promise<any> {
    let size = 15,
      page = 0;
    if (query.size) {
      size = query.size;
      page = query.page;
    }
    const result = await this.categoryService.getAll();
    if (!query.isAll && query.isAll === true) {
      return result;
    }
    return helper.paginateAnArray(result, size, page);
  }

  @ApiOperation({ summary: 'get category by id' })
  @Get('/:id')
  async getById(@Param('id') id: string): Promise<CategoryDto> {
    return this.categoryService.getById(id);
  }

  @ApiOperation({ summary: 'update category by id' })
  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() category: CategoryDto,
  ): Promise<CategoryDto> {
    return await this.categoryService.update(id, category);
  }

  @ApiOperation({ summary: 'get category by id' })
  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<CategoryDto> {
    return await this.categoryService.delete(id);
  }
}
