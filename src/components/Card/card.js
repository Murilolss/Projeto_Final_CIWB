// Componente Card (T-16)
// Monta a lista resumida (RF04) dentro de <div id="lista">: um card do Bootstrap
// por item, com a imagem (com alt), o nome e 1 ou 2 campos. Ao clicar, abre o Modal (T-17).
//
// O que mostrar de cada recurso fica no script.js da página, não aqui. Exemplo (Personagens):
//   function criarCardDoItem(item) {
//       return criarCard(item.name, ['Ator: ' + item.portrayed_by, 'Status: ' + item.status], item.image,
//           function () { abrirPersonagem(item); });
//   }
//   montarLista(itens, criarCardDoItem);
// abrirPersonagem(item) também fica no script.js da página: monta a lista de campos
// e chama mostrarDetalhes(titulo, campos, imagem), do componente Modal (T-17).

// Cria o card de UM item e devolve a coluna da grade com o card dentro.
//   titulo:   o nome do item (vira o título do card e o alt da imagem)
//   linhas:   array com os textos curtos, um parágrafo para cada
//   imagem:   link da imagem, ou null (algumas não têm, e as frases nunca têm)
//   aoClicar: função chamada no clique, ou nada (sem ela, o card não é clicável)
function criarCard(titulo, linhas, imagem, aoClicar) {
    // Coluna da grade: o .row do montarLista decide quantas cabem por linha
    const coluna = document.createElement('div');
    coluna.className = 'col';

    // h-100: todos os cards da mesma linha com a mesma altura
    const card = document.createElement('article');
    card.className = 'card h-100 card-item';

    if (imagem) {
        const img = document.createElement('img');
        img.className = 'card-img-top card-imagem';
        img.src = imagem;
        img.alt = titulo;
        img.loading = 'lazy';    // só baixa a imagem quando ela chega perto da tela
        card.appendChild(img);
    }

    const corpo = document.createElement('div');
    corpo.className = 'card-body';

    // h2 com cara de h5: o h1 é o título da página
    const tituloCard = document.createElement('h2');
    tituloCard.className = 'card-title h5';
    tituloCard.textContent = titulo;
    corpo.appendChild(tituloCard);

    linhas.forEach(function (texto) {
        const paragrafo = document.createElement('p');
        paragrafo.className = 'card-text';
        paragrafo.textContent = texto;
        corpo.appendChild(paragrafo);
    });

    if (aoClicar) {
        // Classe a mais só nos cards clicáveis: o efeito de hover do card.css fica só neles
        card.className = 'card h-100 card-item card-clicavel';

        // Um botão de verdade (abre também pelo teclado, com Tab + Enter).
        // stretched-link (Bootstrap) estica a área de clique do botão para o card inteiro.
        const botao = document.createElement('button');
        botao.type = 'button';
        botao.className = 'btn btn-link stretched-link card-botao';
        botao.textContent = 'Ver detalhes';
        botao.addEventListener('click', aoClicar);
        corpo.appendChild(botao);
    }

    card.appendChild(corpo);
    coluna.appendChild(card);
    return coluna;
}

// Limpa a lista e coloca um card para cada item.
//   itens:           array com os itens (todos, ou só os que a busca achou)
//   criarCardDoItem: função da página que recebe um item e devolve o criarCard(...) dele
// Sem itens, mostra a mensagem de "nenhum item encontrado" (RF07) no componente Aviso.
function montarLista(itens, criarCardDoItem) {
    const lista = document.querySelector('#lista');
    lista.innerHTML = '';

    // Grade do Bootstrap: 1 card por linha no celular, 2 no tablet, 3 e 4 nas telas grandes
    lista.className = 'row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4';

    if (itens.length === 0) {
        mostrarAviso('Nenhum item encontrado.', 'vazio');
        return;
    }

    esconderAviso();   // tira o "Carregando..." ou o "nenhum item" da busca anterior

    itens.forEach(function (item) {
        lista.appendChild(criarCardDoItem(item));
    });
}
