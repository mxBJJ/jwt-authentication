import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from "typeorm"
import bcrypt from 'bcryptjs'


@Entity('users')
export class User {

    constructor(id: string, email: string, password: string) {
        this.id = id
        this.email = email
        this.password = password
    }

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    email: string

    @Column()
    password: string

    @BeforeInsert()
    @BeforeUpdate()
    hasHashPassword() {
        this.password = bcrypt.hashSync(this.password, 8)
    }
}