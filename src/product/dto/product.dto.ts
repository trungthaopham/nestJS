import { IsNotEmpty, IsString, IsNumber, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export class ProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  categoryId: string;

  @ApiProperty()
  @IsNumber()
  price: number;
}
