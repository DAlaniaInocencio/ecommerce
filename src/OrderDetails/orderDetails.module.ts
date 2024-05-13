import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersDetailsService } from './orderDetails.services';
import { OrdersDetailsRepository } from './orderDetails.repository';
import { ORDERDETAILSSen } from '../Entities/orderDetails.entity';




@Module({
  imports: [TypeOrmModule.forFeature([ORDERDETAILSSen])],
  controllers: [],
  providers: [OrdersDetailsService,OrdersDetailsRepository],
})
export class OrderDetailsModule {}
