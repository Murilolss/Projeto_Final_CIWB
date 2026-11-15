// Componente Header (T-11)
// Monta o título do site dentro de <header id="cabecalho">: o logo "Breaking Bad"
// com os ladrilhos de elemento químico (.elemento, do global.css), levando para o início.
//
// Uso: montarHeader(raiz)
//   raiz: caminho da página até a pasta src/ ('' no index.html, '../../' em pages/<nome>/).
//
// O título aqui NÃO é <h1>: cada página já tem o seu <h1> dentro do <main>
// (um <h1> por página ajuda o leitor de tela).

// Cria um ladrilho da tabela periódica:
//   <span class="elemento">
//       <span class="elemento-numero">35</span>
//       <span class="elemento-simbolo">Br</span>
//   </span>
function criarLadrilho(numero, simbolo) {
    const ladrilho = document.createElement('span');
    ladrilho.className = 'elemento';

    const spanNumero = document.createElement('span');
    spanNumero.className = 'elemento-numero';
    spanNumero.textContent = numero;

    const spanSimbolo = document.createElement('span');
    spanSimbolo.className = 'elemento-simbolo';
    spanSimbolo.textContent = simbolo;

    ladrilho.appendChild(spanNumero);
    ladrilho.appendChild(spanSimbolo);
    return ladrilho;
}

// Cria uma palavra do logo: o ladrilho + o resto da palavra (ex.: [Br] + "eaking")
function criarPalavraLogo(numero, simbolo, resto) {
    const palavra = document.createElement('span');
    palavra.className = 'logo-palavra';

    const spanResto = document.createElement('span');
    spanResto.textContent = resto;

    palavra.appendChild(criarLadrilho(numero, simbolo));
    palavra.appendChild(spanResto);
    return palavra;
}

function montarHeader(raiz) {
    const cabecalho = document.querySelector('#cabecalho');
    cabecalho.innerHTML = '';
    cabecalho.className = 'cabecalho';

    const container = document.createElement('div');
    container.className = 'container';

    // Logo: link para a página inicial.
    // O aria-label faz o leitor de tela dizer "Breaking Bad, página inicial"
    // em vez de ler "35 Br eaking 56 Ba d".
    const logo = document.createElement('a');
    logo.className = 'logo';
    logo.href = raiz + 'index.html';
    logo.setAttribute('aria-label', 'Breaking Bad, página inicial');

    // Br = bromo (número 35) e Ba = bário (número 56), como na tabela periódica
    logo.appendChild(criarPalavraLogo('35', 'Br', 'eaking'));
    logo.appendChild(criarPalavraLogo('56', 'Ba', 'd'));

    const slogan = document.createElement('p');
    slogan.className = 'cabecalho-slogan';
    slogan.textContent = 'Guia de fã da série: personagens, mortes, episódios e frases';

    container.appendChild(logo);
    container.appendChild(slogan);
    cabecalho.appendChild(container);
}
