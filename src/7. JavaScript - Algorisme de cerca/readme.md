# 7. JavaScript - Algorisme de cerca
- Para este ejercicio tuve que mirar en que se basa la búsqueda binaria, nunca antes tuve que aplicarla.
- Al aplicar la técnica en un array de números decidí probarla en un array de objects para extender un poco más el uso de la técnica, ya que si buscas como implementar esta técnica, siempre van a usar un array de números que sería lo más simple.

## Ejecución
```bash
node index.js
```

## Planteamiento
- Entiendo que la búsqueda binaria necesita obligatoriamente que esté ordenada por el valor que se va a comprobar de forma numérica.

- El proceso de búsqueda se empieza partiendo el array en 2 partes y calculando el medio, obteniendo tres valores, inicio, medio y final. Ejemplo:

  > - array => [1,2,3,4,5,6]
  > - inicio => 0
  > - medio = 3
  > - final => 5

- Si el valor del elemento que hay en medio es igual, encontramos el valor que buscábamos.

- Si el valor del elemento que hay en medio es superior al que buscamos, significa que podemos ignorar toda la parte desde el medio hasta el final.

- Si el valor del elemento que hay en medio es inferior al que buscamos, significa que podemos ignorar toda la parte desde el inicio hasta el medio.

- Así de forma recursiva llamándose a sí mismo se va recortando la búsqueda, ignorando las partes del array donde seguro que el valor que buscamos no va a estar.

```ts
/**
 * binarySearch - Busca en un array utilizando la tecnica busqueda binaria que funciona en arrays sorteadas (ordenadas) con mejor eficiencia a nivel de benchmark.
 * @arraySorted - Array sorteada por orden numerico. 
 * @target - Valor objetivo de la busqueda
 * @startIdx - Indice inicial de la busqueda
 * @endIdx - Indice final de la busqueda
 * @returns - El indice del elemento con el valor que buscamos
 */
function binarySearch(arraySorted, target, startIdx, endIdx) {
  // Si el indice de inicio es superior al indice final de la busqueda significa que el target no existe en el array;
  if(startIdx > endIdx) return false

  // Calculamos el indice medio de la array
  const midIdx = Math.floor((startIdx + endIdx) / 2);

  // Comprobamos el valor del indice medio
  if(arraySorted[midIdx] === target) return midIdx;

  // Si el valor que contiene el indice medio de la busqueda es superior al target
  // significa que el target debe estar por la parte izquierda de la array
  if(arraySorted[midIdx] > target) {
    // Reducimos la busqueda a la parte izquierda del array
    return binarySearch(arraySorted, target, startIdx, midIdx - 1)
  }
  else {
    // Reducimos la busqueda a la parte derecha del array
    return binarySearch(arraySorted, target, midIdx + 1, endIdx);
  }

}
```

- A continuación pruebo esta técnica con un array de objects.

```ts
// Ejempo con un array de objects
function binarySearchItems(arraySorted, target, startIdx, endIdx) {
  if(startIdx > endIdx) return false

  const midIdx = Math.floor((startIdx + endIdx) / 2);

  if(arraySorted[midIdx].value === target) return midIdx;

  if(arraySorted[midIdx].value > target) {
    return binarySearchItems(arraySorted, target, startIdx, midIdx - 1)
  }
  else {
    return binarySearchItems(arraySorted, target, midIdx + 1, endIdx);
  }

}
```

