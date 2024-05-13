import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PRODUCTSen } from "./products.entity";


@Entity({name: "files"})
export class File {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    mimeType: string;

    @Column({type: "bytea"})
    data: Buffer;

    @ManyToOne( ()=> PRODUCTSen, (product) => product.files)
    @JoinColumn({name: "productFile_id"})
    todo: PRODUCTSen;
}