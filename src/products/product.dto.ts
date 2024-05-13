import { ApiHideProperty, ApiProperty, PickType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import {  categoryDto_product } from "src/Categories/category.dto";
import { CATEGORYSen } from "src/Entities/category.entity";


export class ProductDTO {

    @ApiHideProperty()
    @IsOptional()
    id: string;

    @ApiProperty({ description: 'name', example: 'Panasonic' })   
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ description: 'description', example: 'Modelo XYZ' })   
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({ description: 'price', example: '100' })   
    @IsNotEmpty()
    @IsNumber()
    price: number;

    @ApiProperty({ description: 'stock', example: '10' })   
    @IsNotEmpty()
    @IsNumber()
    stock: number;

    @ApiProperty({ description: 'category', example: '{"id": "21b7f215-9392-47a7-aa7c-bec61e211262","name": "mouse"}'})   
    @IsNotEmpty()
    category: categoryDto_product;

    @ApiProperty({ description: 'imgUrl', example: 'htts://www.imagen.com' })   
    @IsNotEmpty()
    @IsString()
    imgUrl: string;
}

export class ProductDTODOS {
    @ApiHideProperty()
    @IsOptional()
    id: string;

    @ApiProperty({ description: 'name', example: 'Panasonic' })   
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ description: 'description', example: 'Modelo XYZ' })   
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({ description: 'price', example: '100' })   
    @IsNotEmpty()
    @IsNumber()
    price: number;

    @ApiProperty({ description: 'stock', example: '10' })   
    @IsNotEmpty()
    @IsNumber()
    stock: number;

    @ApiProperty({ description: 'category', example: '99a0cb29-84e5-4fc4-8de0-331c831f942b' })   
    @IsNotEmpty()
    category: CATEGORYSen;

    @ApiProperty({ description: 'imgUrl', example: 'htts://www.imagen.com' })   
    @IsNotEmpty()
    @IsString()
    imgUrl: string;
}

