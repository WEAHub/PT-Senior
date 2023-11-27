# # 2. TypeScript - Manipulació de Dades
- En este ejercicio solo tuve que buscar las funciones para generar strings y numeros, podría haberlas hecho yo, pero tardo menos buscándolo, ya que llegaría a las mismas funciones.
---

## Ejecución
```bash
npm run start
```

## El planteamiento:

  - Declarar la interfaz Producte
  ```ts
  interface Product {
    name: string
    price: number
    description: string
    dateAdded: Date
    stock: number
    imageURL: string
  }
  ```

  - Poder generar instancias de esa interfaz con datos aleatorios que correspondan con el tipo. De ahí las funciones randomString y randomNumber:
  ```ts
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
  ```

  - Declarar una variable global del tipo array de productos (interfaz anteriormente creada) e inicializarla para evitar errores.
  ```ts
  const products: Product[] = [];
  ```

  - Crear la funcion para rellenar la array `products` con productos generados de forma aleatoria
  ```ts
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
  ```

  - Crear la función que encuentra el producto con el precio más alto.
  ```ts
  /**
   * findMostExpansiveProduct - Busca el producto con el price más alto.
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

  
  ```

  - Testear el código
  ```ts
  fillProducts(20);
  const mostExpansiveProduct = findMostExpansiveProduct();

  console.table(products)
  console.dir(mostExpansiveProduct)
  ```

  ---
  # Comentarios
  Hay cosas que podría mejorar en este código:
  - En vez de declarar una variable global y hacer que las funciones de `fillProducts` y `findMostExpansiveProduct` sean dependientes de esa variable creando acoplamiento, podría pasar por argumentos el array que quiero llenar y buscar.

  -  Para buscar el producto con el price más alto, sé que se puede usar un sort, reduce, foreach, hay varias opciones.
 Elijo un for de toda la vida porque si tuviéramos el escenario de tener 2 millones de productos, un for tendría más rendimiento que las anteriores.

  