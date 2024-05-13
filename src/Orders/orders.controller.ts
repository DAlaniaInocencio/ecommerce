import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.services';
import { OrderDto } from './orders.dto';
import {AuthGuard} from '../Guard/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ROLES } from 'src/Decoradores/roles.decoradores';
import { Role } from 'src/users/Roles/roles.enum';
import { RolesGuard } from 'src/Guard/roles.guard';

@ApiTags('ORDERS')
@ApiBearerAuth()
@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersControllers01: OrdersService,
  ) {}

  //Controller:Get Orders by ID
  @ROLES(Role.Admin, )
  @UseGuards(AuthGuard,RolesGuard)
  @Get(":id")
  getOrdersControllerbyId(@Param("id") id: string) {
    return this.ordersControllers01.getOrdersServicebyId(id);
  }

  //Controller: Create new order
  @Post()
  createOrdersController(@Body() order: OrderDto) {
    const { userId, products } = order;
    return this.ordersControllers01.PostOrderService(userId, products);
  }

}
