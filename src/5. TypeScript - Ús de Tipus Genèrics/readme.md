# 5. TypeScript - Ús de Tipus Genèrics
- Para este ejercicio no he necesitado mirar nada. El tema del tipado genérico es algo que toqué bastante anteriormente.

## Ejecución
```bash
npm run start
```

## Planteamiento
- Creamos una función de nombre `getLastItem` que se le pueda pasar él una interfaz genérica y así reutilizar ese mismo tipo como resultado y input en los argumentos.
Esta función debe obtener el último elemento del array sin modificar el array.

```ts
/**
 * getLastItem - Obtiene el último elemento de un array con tipo.
 * @T - Interfaz
 * @arrItems - Array
 * @returns - El ultimo elemento del array
 */
function getLastItem<T>(arrItems: T[]): T {
  return arrItems[arrItems.length - 1];
}
```
- En este caso utilizamos `arrItems.length - 1` como la forma más genérica y compatible entre las distintas versiones de ECMAScript.
Actualmente, en la versión ES2022 hay más funciones para hacer lo mismo de forma más leíble como.

```ts 
// Slice es mas lento que `.lenght -1` tengo entendido.
return arrItems.slice(-1);
// A partir de la version ES2022 se pude hacer con .at pero es mas lento tambien.
return arrItems.at(-1);
```


## Testeo
- Para testear esa función generamos una interfaz de lo que sea y rellenamos una array para usar la función.
```ts
interface Person {
  name: string
  age: number
}

const persons: Person[] = [
  { name: 'test', age: 12 },
  { name: 'test1', age: 13 },
  { name: 'test2', age: 14 },
  { name: 'test3', age: 15 },
  { name: 'test4', age: 16 }
]

const lastPerson: Person = getLastItem<Person>(persons);
console.log(lastPerson)
```