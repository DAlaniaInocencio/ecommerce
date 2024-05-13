import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.services';
import { ProductsRepository } from './products.repository';
import { PRODUCTSen } from '../Entities/products.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CATEGORYSen } from 'src/Entities/category.entity';
// import { File } from '../Entities/files.entity';
import { CloudinaryConfig } from 'src/config/cloudinary';


@Module({
  imports: [
    TypeOrmModule.forFeature([PRODUCTSen, CATEGORYSen,
      // File
    ]),
    
],
  controllers: [ProductsController],
  providers: [ProductsService,ProductsRepository,CloudinaryConfig],
})    
export class ProductModule {}
