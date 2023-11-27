import { AppDataSource } from "./data-source"
import { Autor } from "./entitites/Autor"
import { Editorial } from "./entitites/Editorial"
import { Llibre } from "./entitites/Llibre"
import { autors, editorials, llibres } from "./mock/dbdata.mock";

async function findBooksByAuthor(autorId: number) {
  const result = await AppDataSource.getRepository(Llibre)
      .createQueryBuilder('llibre')
      .leftJoinAndSelect('llibre.autor', 'autor')
      .leftJoinAndSelect('llibre.editorial', 'editorial')
      .where('autor.id = :autorId', { autorId })
      .getMany();
  return result;
}

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
