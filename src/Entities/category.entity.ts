import { PRODUCTSen } from "src/Entities/products.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({
    name: "categories",
})
export class CATEGORYSen {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 50, type: "varchar", unique: true, nullable: false })
    name: string;

    //1:N  relacion de uno a uno con category de la tabla "products"
    @OneToMany(() => PRODUCTSen, productRelation => productRelation.category)
    @JoinColumn()
    product: PRODUCTSen[];

}