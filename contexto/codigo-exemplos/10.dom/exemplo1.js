// 1) Métodos de acesso aos elementos do DOM

// 1.1) getElementById(): acessa elementos pelo atributo "id" da tag

// const subtitulo = document.getElementById('sub1');
// console.log(subtitulo.textContent);

// 1.2) getElementsByTagName(): acessa elementos pelo nome da tag
// Retorna um HTMLCollection (funciona parecido com array)

// const paragrafos = document.getElementsByTagName('p');

// for(let i = 0; i < paragrafos.length; i++){
//     console.log(paragrafos[i].textContent);
// }

// paragrafos[1].style.color = 'blue';
// paragrafos[3].style.backgroundColor = 'gray';

// 1.3) getElementsByClassName: acessa elementos de uma mesma classe. Também retorna uma HTMLCollection

// const destaques = document.getElementsByClassName('destaque');

// for (i = 0; i < destaques.length; i++){
//     destaques[i].style.color = 'red';
// }

// 1.4 querySelector(): acessa um elemento que corresponda ao seletor CSS especificado



const primeira = document.querySelector('#primeira');

primeira.style.fontFamily = 'Arial';

//const destaques = document.querySelector('.destaque');

// 1.5 querySelectorAll(): acessa todos os elementos que correspondam ao seletor CSS especificado

const destaques = document.querySelectorAll('.destaque');

for (i = 0; i < destaques.length; i++){
    destaques[i].style.color = 'green';
}

// 2. Modificando elementos

const link = document.querySelector('a');
link.textContent = 'Google';

//link.setAttribute('href', 'http://www.google.com');
link.href = 'http://www.google.com?q=IFSP';
link.target = '_blank';

const h1 = document.querySelector('h1');

h1.className = 'realce';

