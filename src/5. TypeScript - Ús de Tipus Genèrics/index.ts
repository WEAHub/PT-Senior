/**
 * getLastItem - Obtene el ultimo elemento de un array con tipo.
 * @T - Interfaz
 * @arrItems - Array
 * @returns - El ultimo elemento del array
 */
function getLastItem<T>(arrItems: T[]): T {
  return arrItems[arrItems.length - 1];
}

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