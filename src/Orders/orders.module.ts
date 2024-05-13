import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './orders.controller';


import { OrdersRepository } from './orders.repository';
import { OrdersService } from './orders.services';
import { ORDERSen } from '../Entities/orders.entity';
import { PRODUCTSen } from 'src/Entities/products.entity';
import { ORDERDETAILSSen } from 'src/Entities/orderDetails.entity';
import { USERSen } from 'src/Entities/users.entity';




@Module({
  imports: [
    TypeOrmModule.forFeature([ORDERSen]),
    TypeOrmModule.forFeature([USERSen]),
    TypeOrmModule.forFeature([ORDERDETAILSSen]),
    TypeOrmModule.forFeature([PRODUCTSen]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService,OrdersRepository],
})
export class OrderModule {}
