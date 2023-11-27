import { Product } from "./interfaces/product"

const products: Product[] = [];


/**
 * randomString - Genera strings de maximo 5 caracteres de forma aleatoria
 */
const randomString = () => Math.random().toString(36).substring(2,7)

/**
 * randomNumber - Genera un numero aleatorio entre 1-10000
 */
const randomNumber = () => (Math.floor(Math.random() * 10000) + 1)


/**
 * generateProduct - Genera informacion valida para la interfaz Product
 */
function generateProduct(): Product {
  return {
    dateAdded: new Date(),
    description: randomString(),
    imageURL: randomString(),
    name: randomString(),
    price: randomNumber(),
    stock: randomNumber()
  }
}

/**
 * fillProducts - Rellena la variable global products con productos altearios.
 * @max - Numero maximo de productos
 */
function fillProducts(max: number): void {
  if(max < 0) return;

  for(let i = 0; i < max; i++) {
    const newProduct: Product = generateProduct();
    products.push(newProduct)
  }
}

/**
 * findMostExpansiveProductReduce - Busca el producto con el price mas alto con un REDUCE.
 */
function findMostExpansiveProductReduce(): Product {
  const productIdx: number = products.reduce((maxIdx, nextProduct, currIdx) => (
    nextProduct.price > products[maxIdx].price ? currIdx : maxIdx
  ), 0)
  return products[productIdx]
}

/**
 * findMostExpansiveProductMath - Busca el producto con el price mas alto con Math.max.
 */
function findMostExpansiveProductMath(): Product {
  const prices: number[] = products.map(product => product.price);
  const expansiveProductIdx: number = prices.indexOf(Math.max(...prices));
  return products[expansiveProductIdx]
}


/**
 * findMostExpansiveProduct - Busca el producto con el price mas alto con un FOR.
 */
function findMostExpansiveProduct(): Product {
  const maxProducts: number = products.length
  let expansiveProduct: Product = products[0];
  for(let i = 0; i < maxProducts; i++) {
    if(expansiveProduct?.price < products[i].price) {
      expansiveProduct = products[i]
    }
  }
  return expansiveProduct;
}

fillProducts(20);

const mostExpansiveProduct = findMostExpansiveProduct();

console.table(products)
console.dir(mostExpansiveProduct)




