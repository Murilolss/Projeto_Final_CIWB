// const frutas = ['Maçã', 'Tomate', 'Pera', 'Melancia', 'Banana'];

// console.log(frutas);

// frutas.reverse();

// console.log(frutas);

// frutas.sort();

// console.log(frutas);

// if (frutas.includes('Banana')){
//     alert('Temos banana no índice ' + frutas.indexOf('Banana'));
// }



// splice

// remover 2 elementos do array a partir da posição 1
// frutas.splice(1, 2);

// adicionar 2 elementos no array no indice 2
//frutas.splice(2, 0, 'Uva', 'Maracujá'); 

// substituir Pera e Melancia por Uva e Maracuja
//frutas.splice(2, 2, 'Uva', 'Maracujá')

// const outrasFrutas = ['Uva', 'Pêssego'];

// const novasFrutas = frutas.concat(outrasFrutas);

// console.log(novasFrutas);

// frutas.push('Banana');
// frutas.unshift('Morango');

// console.log(frutas.pop()); // Banana
// console.log(frutas.shift()); // Morango

// gerar a lista no HTML utilizando for

// let texto = '';

// // for(let i = 0; i < frutas.length; i++){

// //     texto += `<li>${frutas[i]}</li>`;
// // }

// //frutas.forEach((fruta) => {texto += `<li>${fruta}</li>`});

// for (let fruta of frutas){
//     texto += `<li>${fruta}</li>`;
// }


// // acessa a <ul> no HTML e coloca o texto dentro da tag
// document.querySelector('#frutas').innerHTML = texto;

const numerico = [4, 1, 8, 23, 45, 100, 10, 5];

console.log(numerico);

console.log(numerico.sort((a, b) => a - b)); // ascendente
console.log(numerico.sort((a, b) => b - a)); // descendente