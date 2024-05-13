import { Injectable, NotAcceptableException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ORDERDETAILSSen } from "src/Entities/orderDetails.entity";
import { Repository } from "typeorm";



@Injectable()
export class OrdersDetailsRepository {
    constructor(@InjectRepository(ORDERDETAILSSen)
        private orderDetailsRepository: Repository<ORDERDETAILSSen>) { }

    //Repository: Get all OrderDetails
    async getOrderDetailsRepository(page: number, limit: number) { 
        const skip = (page - 1) * limit;
        const orderDetails = await this.orderDetailsRepository.find({
            take: limit,
            skip: skip,
            relations: {
                products: true,
            }
        })
        return orderDetails    
    }

    //Repository: Get OrderDetails by Id
    async getOrderDetailsRepositoryId(id: string) {
        const findOrderDetails = await this.orderDetailsRepository.findOne({
            where: { id },
            relations: {
                products: true,
            }
        });

        if(!findOrderDetails) throw new NotAcceptableException(`Not found OrderDetails with id ${id}`)
        const {... respuesta} = findOrderDetails
        return respuesta;
    }

    
    //Repository: Update OrderDetails
    async updateOrderDetailsRepository(id: string, order: Partial<ORDERDETAILSSen>) {
        await this.orderDetailsRepository.update(id, order);
        const findUpdateOrderDetails = await this.orderDetailsRepository.findOneBy({ id });
        
        return findUpdateOrderDetails;
    }

    //Repository: Delete OrderDetails by Id
    async deleteOrderDetailsRepository(id: string) {
        const findOrderDetails = await this.orderDetailsRepository.findOneBy({ id});
        await this.orderDetailsRepository.delete(findOrderDetails);

        return `OrderDetails with id ${findOrderDetails} deleted`
    }

}