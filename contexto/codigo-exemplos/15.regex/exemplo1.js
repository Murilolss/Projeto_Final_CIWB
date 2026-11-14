const texto = `Estou aprendendo a desenvolver sistemas no curso de Sistemas para Internet`;

// Duas formas de criar uma expressão regular

//const padrao = new RegExp('sistemas');
const padrao1 = /sistemas/;
const padrao2 = /Sistemas/;
const padrao3 = /SISTEMAS/;
const padrao4 = /SISTEMAS/i; // ignore case
const padrao5 = /SISTEMAS/ig; // ignore case + global

// replace() --> substituir o padrao
let novoTexto = texto.replace(padrao1, 'programas');
console.log(novoTexto);


// método search() --> retorna o índice da primeira ocorrência
//console.log(texto.search(padrao2)); // 52
//console.log(texto.search(padrao3)); // -1
//console.log(texto.search(padrao5)); // 31

// método match()
//console.log(texto.match(padrao1));
//console.log(texto.match(padrao5));

// método exec()
//console.log(padrao1.exec(texto));
//console.log(padrao3.exec(texto));
//console.log(padrao4.exec(texto));
//console.log(padrao5.exec(texto));
//console.log(padrao5.exec(texto));

// let resultado;

// while((resultado = padrao5.exec(texto)) != null){

//     console.log(`Encontrou ${resultado[0]} no índice ${resultado.index}`);
// }


// método test(): retorna true ou false
// console.log(padrao1.test(texto)); // true
// console.log(padrao2.test(texto)); // true
// console.log(padrao3.test(texto)); // false
// console.log(padrao4.test(texto)); // true




