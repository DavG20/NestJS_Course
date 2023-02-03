import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Clothe {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'user_id',
    })
    id: number;


    @Column(
        {
            name: 'cloth_type',
            nullable: false,
        }


    )
    clothtype: string

    @Column({
        name: 'description',
        nullable: false
    })
    description: string



    @Column({
        name: 'price',
        nullable: false
    })
    price: number

    @Column({
        name: 'origin',
        nullable: true,
        default: ""
    })
    origin: string
}
