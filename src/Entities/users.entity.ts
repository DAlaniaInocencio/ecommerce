import { ORDERSen } from "src/Entities/orders.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "users",
})
export class USERSen {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 50, type: "varchar", nullable: false })
    name: string;

    @Column({ length: 50, unique: true, type: "varchar", nullable: false })
    email: string;

    @Column({ length: 100, type: "varchar", nullable: false })
    password: string;

    @Column({ type: "text" })
    address: string;

    @Column({ type: "int" })
    phone: number;

    @Column({ length: 50, nullable: true })
    country: string;

    @Column({ length: 50, type: "varchar" })
    city: string;

    @Column({ default: false, })
    isAdmin: boolean;

    //relacion de muchos a uno con orders
    @OneToMany(() => ORDERSen, order => order.user)
    orders: ORDERSen[];
    
}