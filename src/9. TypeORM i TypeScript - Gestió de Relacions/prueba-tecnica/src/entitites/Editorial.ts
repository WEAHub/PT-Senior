import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Llibre } from "./Llibre"

@Entity()
export class Editorial {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nom: string;

    @OneToMany(() => Llibre, llibre => llibre.editorial)
    llibres: Llibre[];

}
