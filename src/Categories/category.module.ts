import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoriesController } from './category.controller';
import { CategoriesService } from './category.services';
import { CategoriesRepository } from './category.repository';
import { CATEGORYSen } from '../Entities/category.entity';


@Module({
  imports: [TypeOrmModule.forFeature([CATEGORYSen])],
  controllers: [CategoriesController],
  providers: [CategoriesService,CategoriesRepository],
})
export class CategoryModule {}
