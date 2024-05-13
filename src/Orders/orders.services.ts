import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersservices00: OrdersRepository) {}

  //Service: Get Orders by Id
  getOrdersServicebyId(id:string) {
    return this.ordersservices00.GetOrderbyId(id)
  }

  //Service: Add Orders
  PostOrderService(userId: string, products: any) {
    return this.ordersservices00.PostProductsRepository(userId, products)
  }

}
