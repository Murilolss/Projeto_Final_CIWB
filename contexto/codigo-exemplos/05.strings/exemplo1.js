// const nome = 'João';
// const sobrenome = 'Pereira';

// let msg = `Olá, ${nome} ${sobrenome}. Seja bem-vindo!`;

// document.querySelector('#titulo').textContent = msg;

// let nome = 'Karina';

// nome[0] = 'M';

// console.log(nome);

// const carro = 'Opala';

// console.log(carro[2]); // a
// console.log(carro.at(3)); // l
// console.log(carro.charAt(1)); // p

// console.log(carro[6]); // undefined
// console.log(carro.at(6)); // undefined
// console.log(carro.charAt(6)); // string vazia

// console.log(carro[-1]); // undefined
// console.log(carro.at(-1)); // a
// console.log(carro.charAt(-1)); // string vazia

// // como imprimir o ultimo caractere utilizando []?
// console.log(carro[carro.length-1]);

// const nomeArquivo = 'churrasco.png';

// //const extensao = nomeArquivo.slice(10); // do 10 até o fim
// const extensao = nomeArquivo.slice(-3); // do -3 até o fim
// //const nomefoto = nomeArquivo.substring(0, 9);
// const nomefoto = nomeArquivo.substring(0, nomeArquivo.length-4);
// console.log(extensao);
// console.log(nomefoto);

// replace

const texto = `O tempo perguntou para o TEMPO: quanto Tempo o tempo tem?...`

// const novoTexto = texto.replace('tempo', 'clima');
//const novoTexto = texto.toLowerCase().replaceAll('tempo', 'clima');
// const novoTexto = texto.replace(/tempo/ig, 'clima');

// console.log(novoTexto);

// //const arrayTexto = texto.split("");
// // const arrayTexto = texto.split(" ");
// const arrayTexto = texto.split(":");

// console.log(arrayTexto);

// console.log(texto.indexOf('tempo'));// 2
// console.log(texto.lastIndexOf('tempo'));// 47

// console.log(texto.match(/tempo/ig));

let nomeArquivo = 'Trabalho.pdf';

if (nomeArquivo.endsWith('.pdf')){
    console.log('Esse arquivo está no formato PDF');
}