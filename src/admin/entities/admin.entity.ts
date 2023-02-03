import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class Admin {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'user_id',
    })
    id: number;

    @Column({
        name: 'email_address',
        nullable: false,
        
        
    })
    email: string;

    @Column({
        name:'password',
        nullable: false,
        
    })
    password: string;
}