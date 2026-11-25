// JS da Página inicial

// Guardados aqui fora para o botão "Sortear outra frase" enxergar depois do carregamento
let frases = [];
let indiceAtual = -1;   // posição da frase na tela (-1: nenhuma ainda)


// ===================== Atalhos (ladrilhos) =====================

// Um atalho para cada página do menu, menos o Início (paginasDoMenu fica no navbar.js).
// Cada atalho é um link com o ladrilho, o nome, a descrição e o total, que começa vazio
// e é preenchido pelo mostrarTotal quando os dados chegam.

function montarAtalhos() {
    const atalhos = document.querySelector('#atalhos');
    atalhos.innerHTML = '';

    // for para o índice vira o "número atômico" do ladrilho.
    // Começa em 1 para pular o Início, que é a posição 0.
    for (let i = 1; i < paginasDoMenu.length; i++) {
        const pagina = paginasDoMenu[i];

        const coluna = document.createElement('div');
        coluna.className = 'col';

        const link = document.createElement('a');
        link.className = 'atalho';
        link.href = pagina.caminho;

        // criarLadrilho vem do header.js (o mesmo do logo "Br" "Ba").
        // aria-hidden: o leitor de tela lê só o nome da página, e não "1 Pe".
        const ladrilho = criarLadrilho(i, pagina.simbolo);
        ladrilho.setAttribute('aria-hidden', 'true');

        const nome = document.createElement('h3');
        nome.className = 'atalho-nome h5';
        nome.textContent = pagina.nome;

        const descricao = document.createElement('p');
        descricao.className = 'atalho-descricao';
        descricao.textContent = pagina.descricao;

        // id="total-personagens", "total-mortes"...: o mostrarTotal acha o parágrafo pelo id
        const total = document.createElement('p');
        total.className = 'atalho-total';
        total.id = 'total-' + pagina.id;

        link.appendChild(ladrilho);
        link.appendChild(nome);
        link.appendChild(descricao);
        link.appendChild(total);
        coluna.appendChild(link);
        atalhos.appendChild(coluna);
    }
}

// Escreve o total no ladrilho da página.
function mostrarTotal(idPagina, texto) {
    const total = document.querySelector('#total-' + idPagina);
    total.textContent = texto;
}

// Cada registro de morte tem victims_count: 1 nas mortes individuais e o total nos
// grupos
function somarVitimas(mortes) {
    let soma = 0;
    mortes.forEach(function (morte) {
        soma = soma + morte.victims_count;
    });
    return soma;
}


// ===================== Elenco principal =====================

// Só os personagens do elenco principal (role === 'principal').
// forEach + if + push.
function personagensPrincipais(personagens) {
    const principais = [];
    personagens.forEach(function (personagem) {
        if (personagem.role === 'principal') {
            principais.push(personagem);
        }
    });
    return principais;
}

// Card de UM personagem (componente Card). Sem a função de clique, o card não é
// clicável: os detalhes completos ficam na página de Personagens.
// 'h3': os cards ficam dentro da seção "Elenco principal", que é h2 (T-28).
function criarCardDoElenco(personagem) {
    return criarCard(personagem.name, ['Interpretado por ' + personagem.portrayed_by], personagem.image, null, null, 'h3');
}


// ===================== Frase em destaque =====================

// As 4 frases com palavrão (explicit: true) ficam fora do sorteio da página inicial
function frasesSemPalavrao(todas) {
    const selecionadas = [];
    todas.forEach(function (frase) {
        if (!frase.explicit) {
            selecionadas.push(frase);
        }
    });
    return selecionadas;
}

// Preenche a seção com a frase: português, inglês, quem fala, episódio e contexto
function mostrarFrase(frase) {
    document.querySelector('#frase-pt').textContent = '“' + frase.quote.pt + '”';
    document.querySelector('#frase-en').textContent = '“' + frase.quote.en + '”';
    document.querySelector('#frase-autor').textContent = frase.name + ' · Episódio ' + frase.episode_code;
    document.querySelector('#frase-contexto').textContent = frase.context;
}

// Sorteia uma posição de 0 até frases.length - 1.
function sortearFrase() {
    let indice = Math.floor(Math.random() * frases.length);

    while (indice === indiceAtual && frases.length > 1) {
        indice = Math.floor(Math.random() * frases.length);
    }

    indiceAtual = indice;
    mostrarFrase(frases[indice]);
}


// ===================== Início =====================

async function iniciarPagina() {
    montarHeader('');
    montarNavbar('inicio', '');
    montarAtalhos();

    // try/catch: se algo der throw lá dentro (config.json ou API fora do ar),
    // o JavaScript pula para o catch, que mostra o erro na tela
    try {
        const config = await carregarConfig('');
        montarFooter(config.apiUrl);

        mostrarAviso('Carregando...', 'carregando');

        // Carrossel de imagens, aqui ele olha primeiro o LocalStorage (cache) e só chama a API se não tiver nada lá.
        // O montarCarrossel (carrossel.js) cria o carrossel do Bootstrap e coloca no <section id="carrossel">.
        const slides = await buscarComCache(config.prefixoCache + 'carrossel', config.apiUrl + '/carousel');
        montarCarrossel(slides);

        // Aqui ele carrega os dados da API e salva no LocalStorage com cada nome da pagina.
        const personagens = await buscarComCache(config.prefixoCache + 'personagens', config.apiUrl + '/characters');
        const mortes = await buscarComCache(config.prefixoCache + 'mortes', config.apiUrl + '/deaths');
        const temporadas = await buscarComCache(config.prefixoCache + 'temporadas', config.apiUrl + '/seasons');
        const episodios = await buscarComCache(config.prefixoCache + 'episodios', config.apiUrl + '/episodes');
        const todasAsFrases = await buscarComCache(config.prefixoCache + 'frases', config.apiUrl + '/quotes');

        // Números da série nos ladrilhos: o length do array é o total de itens
        mostrarTotal('personagens', personagens.length + ' personagens');
        mostrarTotal('mortes', somarVitimas(mortes) + ' vítimas');
        mostrarTotal('temporadas', temporadas.length + ' temporadas');
        mostrarTotal('episodios', episodios.length + ' episódios');
        mostrarTotal('frases', todasAsFrases.length + ' frases');

        // Elenco principal (componente Card, dentro de <div id="lista">) e mostra a seção
        montarLista(personagensPrincipais(personagens), criarCardDoElenco);
        document.querySelector('#elenco').hidden = false;

        // Frase em destaque: sorteia uma e mostra a seção
        frases = frasesSemPalavrao(todasAsFrases);
        sortearFrase();
        document.querySelector('#frase').hidden = false;

        document.querySelector('#outra-frase').addEventListener('click', sortearFrase);

        esconderAviso();
    } catch (erro) {
        mostrarAviso('Não foi possível carregar os dados: ' + erro.message, 'erro');
    }
}

iniciarPagina();
