import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { Autor } from "./Autor"
import { Editorial } from "./Editorial"

@Entity()
export class Llibre {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titol: string;

    @Column()
    preu: number;

    @ManyToOne(() => Autor, autor => autor.llibres, { eager: true })
    autor: Autor;

    @ManyToOne(() => Editorial, editorial => editorial.llibres, { eager: true })
    editorial: Editorial;

}
