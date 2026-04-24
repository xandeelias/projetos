const numeros = [45, 4, 9, 16, 25]
numeros.forEach(valor => console.log(valor));

const numeros2 = numeros.map(valor => valor * 2)
numeros2.forEach(valor => console.log(valor));

const numeros3 = numeros.filter(valor => valor > 18)
numeros3.forEach(valor => console.log(valor));

console.log(numeros.reduce((total, valor) => total + valor));

console.log(numeros.length);
numeros.length = 10;
console.log(numeros);
console.log(numeros[6]);
numeros.length = 4;
console.log(numeros);
numeros.length = 5;
console.log(numeros);

numeros.push(25);
console.log(numeros);

numeros.pop();
console.log(numeros);

numeros.pop();
numeros.push(25);
console.log(numeros);