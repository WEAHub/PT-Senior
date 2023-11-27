import "reflect-metadata"
import { DataSource } from "typeorm"
import { Llibre } from "./entitites/Llibre"
import { Autor } from "./entitites/Autor"
import { Editorial } from "./entitites/Editorial"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "llibres-cms",
    synchronize: true,
    logging: false,
    dropSchema: true,
    entities: [Llibre, Autor, Editorial],
    migrations: [],
    subscribers: [],
})
