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

const arraySorted = [11, 12, 25, 33, 43, 44, 54, 55, 63, 82, 91, 99]
const arrayEndIdx = arraySorted.length;
const target = 33;

const arrayIdx = binarySearch(arraySorted, target, 0, arrayEndIdx)
const idxFound = arrayIdx !== false

if(idxFound) {
  console.log(`El indice es ${arrayIdx}`)
}
else {
  console.log(`No existe ningun elemento con el valor ${target}`)
}


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

const arrayItems = [
  { name: 'test1', value: 10 },
  { name: 'test2', value: 22 },
  { name: 'test3', value: 33 },
  { name: 'test4', value: 44 },
  { name: 'test5', value: 55 },
  { name: 'test6', value: 66 },
]
const arrayItemsEndIdx = arrayItems.length;
const targetValue = 33;

const arrayItemIdx = binarySearchItems(arrayItems, targetValue, 0, arrayItemsEndIdx)
const itemIdxFound = arrayIdx !== false

if(itemIdxFound) {
  console.log(`El indice del item es ${arrayItemIdx}`)
  console.log(arrayItems[arrayItemIdx])
}
else {
  console.log(`No existe ningun elemento con el valor ${targetValue}`)
}

