# 9. TypeORM & TypeScript - Gestió de Relacions
- Para este ejercicio he tenido que consultar sobre el `eager loading`
- Debo reconocer que mi conocimiento sobre TypeORM es limitado para hacer este ejercicio de una forma limpia.
- He creado un ejemplo funcional para testear levantando una base de datos mysql.

## Configuración
- He usado de base simple de TypeORM para probar este ejercicio usando el comando:
```bash
typeorm init --name <project-name> --database <database-name>
```
- He añadido a la configuración del datasource las entidades y la opción de dropSchema para poder resetear la db en cada prueba.
```ts
{
  ...
  dropSchema: true,
  entities: [Llibre, Autor, Editorial],
  ...
}
```

## Entidades

### Llibres
```ts
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
```

### Autor
```ts
@Entity()
export class Autor {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nom: string;

    @OneToMany(() => Llibre, llibre => llibre.autor)
    llibres: Llibre[];
}
```

### Editorial

```ts
@Entity()
export class Editorial {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nom: string;

    @OneToMany(() => Llibre, llibre => llibre.editorial)
    llibres: Llibre[];

}

```
## Planteamiento
- Relleno la base de datos con datos mockeados útiles en un orden que luego pueda relacionarlos entre ellos.
  - 1. Añado autores.
  ```ts
  const autors = [
    { nom: 'William Shakespeare' },
    { nom: 'Miguel de Cervantes' },
    { nom: 'Paulo Coelho' },
    { nom: 'Stephen King' },
    { nom: 'J. R. R. Tolkien' },
  ]
  ```

  - 2. Añado editoriales.
  ```ts
  const editorials = [
    { nom: 'Editorial 1' },
    { nom: 'Editorial 2' },
    { nom: 'Editorial 3' },
    { nom: 'Editorial 4' },
    { nom: 'Editorial 5' },
  ]
  ```

  - 3. Añado los libros relacionando entidades y autores.
  ```ts
  const llibres = [
    { titol: 'Llibre 1', preu: 15, autor: null, editorial: null },
    { titol: 'Llibre 2', preu: 10, autor: null, editorial: null },
    { titol: 'Llibre 3', preu: 12, autor: null, editorial: null },
    { titol: 'Llibre 4', preu: 13, autor: null, editorial: null },
    { titol: 'Llibre 5', preu: 14, autor: null, editorial: null },
    { titol: 'Llibre 6', preu: 15, autor: null, editorial: null },
    { titol: 'Llibre 7', preu: 16, autor: null, editorial: null },
    { titol: 'Llibre 8', preu: 17, autor: null, editorial: null },
    { titol: 'Llibre 9', preu: 22, autor: null, editorial: null },
    { titol: 'Llibre 10', preu: 33, autor: null, editorial: null },
  ]
  ```

 - La función para rellenar la db al iniciar la prueba.
 - Cuando añado los libros intento añadir minimo 5 libros al primer autor que es `William Shakespeare` y los demás random.
 ```ts
  async function fillDatabase() {
    await Promise.all(
      autors.map(async (autor) => {
        const newAutor = new Autor();
        newAutor.nom = autor.nom;
        return await AppDataSource.manager.save(newAutor)
      })
    )


    await Promise.all(
      editorials.map(async (editorial) => {
        const newEditorial = new Editorial()
        newEditorial.nom = editorial.nom
        return await AppDataSource.manager.save(newEditorial)
      })
    )
    
    const dbAutors = await AppDataSource.manager.find(Autor)
    const dbEditorials = await AppDataSource.manager.find(Editorial)

    await Promise.all(
      llibres.map(async (llibre, index) => {
        const newBook = new Llibre()
        const editorialIdx = Math.floor(Math.random() * 5)
        const autorIdx = Math.floor(Math.random() * 5)
        newBook.titol = llibre.titol
        newBook.preu = llibre.preu
        newBook.autor = index <= 5 ? dbAutors[0] : dbAutors[autorIdx]
        newBook.editorial = dbEditorials[editorialIdx]
        return await AppDataSource.manager.save(newBook)
      })
    )

  }
 ```

- Una vez tenemos los libros, podemos utilizar esta función que crea la consulta utilizando el repositorio de `Llibre` juntando las tablas de `autores` y `editoriales` y filtrando por el `autorId`
```ts
// Sin eager
async function findBooksByAuthor(autorId: number) {
  const result = await AppDataSource.getRepository(Llibre)
      .createQueryBuilder('llibre')
      .leftJoinAndSelect('llibre.autor', 'autor')
      .leftJoinAndSelect('llibre.editorial', 'editorial')
      .where('autor.id = :autorId', { autorId })
      .getMany();
  return result;
}

// Con eager
async function findBooksByAuthorEager(autorId: number) {
  const result = await AppDataSource.getRepository(Llibre)
    .find({
      relations: {
        editorial: true,
        autor: true
      },
      where: {
        autor: {
          id: autorId
        }
      }
    })

  return result;
}
```

- Preparado todo podemos iniciar el testeo llamando a `fillDatabase()` y `findBooksByAuthor()`
```ts
AppDataSource.initialize().then(async () => {
  await fillDatabase();
  // Libros de William Shakespeare

  // Sin eager
  const booksFound = await findBooksByAuthor(1);
  console.log(booksFound)

  // Eager
  const booksFoundEager = await findBooksByAuthorEager(1);
  console.log(booksFoundEager)
}).catch(error => console.log(error))
```

