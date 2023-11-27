import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Llibre } from "./Llibre"

@Entity()
export class Autor {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nom: string;

    @OneToMany(() => Llibre, llibre => llibre.autor)
    llibres: Llibre[];
}
