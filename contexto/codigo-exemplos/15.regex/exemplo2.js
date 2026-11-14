// brackets []

// const padrao1 = /[0-9]/;
// const padrao2 = /[a-z]/;
// const padrao3 = /[a-zA-Z]/;// encontro qqer letra, maiuscula ou minuscula
// const padrao4 = /[A-Za-z0-9]/; // letras minusculas + digitos de 0 a 9

// let texto1 = 'a';
// let texto2 = '5';

// console.log(padrao1.test(texto1)); // false
// console.log(padrao1.test(texto2)); // true 

// console.log(padrao2.test(texto1)); // true
// console.log(padrao2.test(texto2)); // false 

const texto = 'Meu CEP é 12345-123';
const texto2 = '12349-098';

const padCEP = /^\d{5}-\d{3}$/;

console.log(padCEP.test(texto)); // false
console.log(padCEP.test(texto2)); // true

