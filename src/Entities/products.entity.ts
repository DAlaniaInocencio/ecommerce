import { CATEGORYSen } from "src/Entities/category.entity";
import { ORDERDETAILSSen } from "src/Entities/orderDetails.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { File } from "./files.entity";


@Entity({
    name: "products",
})
export class PRODUCTSen {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 50, type: "varchar", unique: true, nullable: false })
    name: string;

    @Column({ type: "text", nullable: false })
    description: string;

    @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
    price: number;

    @Column({ type: "int", nullable: false })
    stock: number;

    @Column({ type: "text", default:"./config/image.png" })
    imgUrl: string;

    //relacion de Many to one con product de la tabla "categories" 
    @ManyToOne(() => CATEGORYSen, categoryRelation => categoryRelation.product)
    // @JoinColumn({ name: 'category_id' })    
    category: CATEGORYSen;

    //relacion de muchos a muchos con product de la tabla "ordersdetails" 
    @ManyToMany(() => ORDERDETAILSSen, orderDetailRelation => orderDetailRelation.products)
    // @JoinTable({ name: 'order_details_relation' })
    orderDetails: ORDERDETAILSSen[];

    @OneToMany(()=> File, file => file.todo)
    files: File[]

}