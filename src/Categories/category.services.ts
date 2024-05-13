import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './category.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesService00: CategoriesRepository) {}

 //Service: Charge categories
  PostCategoriesServices() {
    return this.categoriesService00.PostCategoriesRepository();
  }

  //Service: Get All categories
  getCategoriesServices(page: number, limit: number) {
    return this.categoriesService00.getCategoriesRepository(page,limit);
  }
  
}


