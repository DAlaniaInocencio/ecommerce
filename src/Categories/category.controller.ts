import { Controller, Get, Post, Query } from '@nestjs/common';
import { CategoriesService } from './category.services';
import {  ApiTags } from '@nestjs/swagger';


@ApiTags('CATEGORIES')
@Controller("categories")
export class CategoriesController {
  constructor(
    private readonly categoriesControllers01: CategoriesService,
  ) {}

  //Controller: Charge categories
  @Post("seeder")
  async postCategorySeederController(){
    const categories  = await this.categoriesControllers01.PostCategoriesServices();
    return categories ;
  }

  //Controller: Get All Categories
  @Get()
  getCategoryController(@Query("page") page:string, @Query("limit") limit:string) {
    return this.categoriesControllers01.getCategoriesServices(Number(page),Number(limit));
  }
  
}
