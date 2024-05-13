import { ORDERSen } from "src/Entities/orders.entity";
import { PRODUCTSen } from "src/Entities/products.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({
    name: "ordersdetails",
})
export class ORDERDETAILSSen {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    price: number;

    //relacion de muchos a muchos con orderDetails de la tabla "products" 
    @ManyToMany(() => PRODUCTSen)
    @JoinTable({
        name: "orderdetails_products",
        joinColumn: {
            name: "product_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "order_id",
            referencedColumnName: "id"
        } 
    })
    products: PRODUCTSen[];

    //relacion de uno a uno con product_orderDetail
    @OneToOne(() => ORDERSen, nro_order_relation => nro_order_relation.orderDetail )
    @JoinColumn({ name: "nro_order" })
    nro_order: ORDERSen;
}