import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ORDERSen } from "../Entities/orders.entity";
import { Repository } from "typeorm";
import { ORDERDETAILSSen } from "src/Entities/orderDetails.entity";
import { USERSen } from "src/Entities/users.entity";
import { PRODUCTSen } from "src/Entities/products.entity";


@Injectable()
export class OrdersRepository {
    constructor(
        @InjectRepository(ORDERSen)
        private orderRepository: Repository<ORDERSen>,

        @InjectRepository(ORDERDETAILSSen)
        private orderdetailsRepository: Repository<ORDERDETAILSSen>,

        @InjectRepository(USERSen)
        private usersRepository: Repository<USERSen>,
        
        @InjectRepository(PRODUCTSen)
        private productsRepository: Repository<PRODUCTSen>,

    ) { }
  
    //**Repository: Get orders by Id
    async GetOrderbyId(id: string) {
        const order =  await this.orderRepository.findOne({
            where: {id },
            relations: {
                orderDetail: {
                    products: true,
                }
            },
        });
        if(!order) return `Order with id ${id} not found`;
        return order;
    }
  
    //**Repository: Add orders
    async PostProductsRepository(userId: string, products: any) {
        let total =0;

        //verificamos que existe el usuario:
        const user = await this.usersRepository.findOneBy({id: userId});
        if(!user) return `User with id ${userId} not found`;

        //Creamos la orden:
        const order = new ORDERSen();
        order.date = new Date();
        order.user = user;

        const newOrder = await this.orderRepository.save(order);
    
        //Asociasmos cada "id" recibido con el "producto":
        const productsArray = await Promise.all(
            products.map(async (element) => {
                const product = await this.productsRepository.findOneBy({id: element.id,});
            
                if(!product) return `Product with id ${element.id} not found`;

                //Calculamos el monsto total:
                total += Number(product.price);

                //Actualizamos el "Stock"
                await this.productsRepository.update(
                    {id: element.id},
                    {stock: product.stock - 1}
                );
                return product;
            })
        );

        //Create "OrderDetails" and we insert in BBDD:
        const neworderDetail = new ORDERDETAILSSen();
        neworderDetail.price = Number(Number(total).toFixed(2));
        neworderDetail.products = productsArray;
        neworderDetail.nro_order = newOrder;
        await this.orderdetailsRepository.save(neworderDetail);

        //Enviamos al cliente la compra con la info de productos;
        return await this.orderRepository.find({
            where: {id: newOrder.id},
            relations: {orderDetail: true,},
        });

    }

}