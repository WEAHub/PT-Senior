/**
 * isPrime - Comprueba si el número introducido es primo.
 * @num - numero
 */

function isPrime(num) {

  // Comprobamos que el número no sea 1 o inferior.
  if (num <= 1) {
    return false;
  }

  // Comprobamos si el número "num" es divisible por los números inferiores al mismo.
  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      return false;
    }
  }

  // Si el número "num" no es divisible por los números inferiores a él significa que es primo.
  return true;

 }

console.log(isPrime(3));