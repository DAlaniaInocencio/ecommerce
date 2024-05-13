import { ORDERDETAILSSen } from "src/Entities/orderDetails.entity";
import { USERSen } from "src/Entities/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({
    name: "orders",
})
export class ORDERSen {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    date: Date;

    // ORDERSen N:1 USERSen | relacion de uno a muchos con usersen
    @ManyToOne(() => USERSen, user => user.orders)
    @JoinColumn({ name: 'user_id' })
    user: USERSen;

    //relacion de uno a uno con nro_order
    @OneToOne(() => ORDERDETAILSSen, orderDetail  => orderDetail.nro_order)
    // @JoinColumn({ name: 'prdouct_orderDetail' })
    orderDetail: ORDERDETAILSSen;

}

