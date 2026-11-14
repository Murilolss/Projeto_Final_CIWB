const ul = document.querySelector('ul');

// 1) Criar um novo elemento

const novoLi = document.createElement('li');
novoLi.textContent = 'Mauro Junior';

// 2) Adicionar um elemento ao DOM

// 2.1) appendChild(): adiciona um elemento como último filho
//ul.appendChild(novoLi); 

// 2.2) insertBefore():adiciona um elemento antes de um determinado filho

// Inserir como primeiro filho
// const primeiroFilho = document.querySelectorAll('li')[0];
// ul.insertBefore(novoLi, primeiroFilho);

// Inserir o novo elemento antes do Otavio

let filho;

const jogadores = document.querySelectorAll('li');

for(let i = 0; i < jogadores.length; i++){

    if (jogadores[i].textContent == 'Otávio'){
        filho = jogadores[i];
        break;
    }
}

//ul.insertBefore(novoLi, filho);
filho.parentNode.insertBefore(novoLi, filho);

// 3) Remover um nó

// removeChild(): remove um elemento a partir de seu pai
//ul.removeChild(filho);

// 4) Substituir um nó

// replaceChild(): substitui um elemento a partir de seu pai
const novoFilho = document.createElement('li');
novoFilho.textContent = 'Arthur Dias';

ul.replaceChild(novoFilho, filho);