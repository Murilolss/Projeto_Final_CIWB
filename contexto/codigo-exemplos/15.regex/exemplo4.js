
const citacao = 'Silva, Marcos'; // --> Marcos Silva

const er = /^([a-zA-Z]+),\s([a-zA-Z]+)$/

const nome = citacao.replace(er, '$2 $1');

console.log(nome);