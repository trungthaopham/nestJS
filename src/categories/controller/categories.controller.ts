import {
  Body,
  Param,
  Controller,
  Post,
  Get,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
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
  async getAll(): Promise<CategoryDto[]> {
    return this.categoryService.getAll();
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
