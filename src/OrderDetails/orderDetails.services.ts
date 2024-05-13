import { Injectable } from '@nestjs/common';
import { OrdersDetailsRepository } from './orderDetails.repository';

@Injectable()
export class OrdersDetailsService {
  constructor(private readonly ordersREpository00: OrdersDetailsRepository) {}

  //Service: Get All orderDetails
  async getOrderDetailsService(page: number, limit: number) {
    return await this.ordersREpository00.getOrderDetailsRepository(page, limit);
  }

  //Service: Get orderDetails by Id
  async getOrderDetailsServicesId(id: string) {
    return await this.ordersREpository00.getOrderDetailsRepositoryId(id);
  }


  //Service: Update orderDetails
  async updateOrderDetailsServices(id: string, order: any) {
    return await this.ordersREpository00.updateOrderDetailsRepository(id, order);
  }


  //Service: delete orderDetails by Id
  async deleteOrderDetailsServices(id: string) {
    return await this.ordersREpository00.deleteOrderDetailsRepository(id);
  }
}
