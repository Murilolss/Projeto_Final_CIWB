// Componente Footer (T-11)
// Monta o rodapé dentro de <footer id="rodape">: disciplina (CIWB - IFSP),
// integrantes do grupo e a fonte dos dados (a API de Breaking Bad do grupo).
//
// Uso: montarFooter(apiUrl)
//   apiUrl: o link da API, lido do config.json (config.apiUrl). Ele não fica
//           escrito aqui: muda só no config.json. Se vier vazio, o rodapé
//           mostra o nome da API sem o link.

// Integrantes do grupo: para incluir alguém, basta acrescentar o nome aqui
const integrantesDoGrupo = ['Murilo Leandro', 'Mateus Calixto'];

// Cria um parágrafo com o título de uma coluna do rodapé
function criarTituloRodape(texto) {
    const titulo = document.createElement('p');
    titulo.className = 'rodape-titulo';
    titulo.textContent = texto;
    return titulo;
}

function montarFooter(apiUrl) {
    const rodape = document.querySelector('#rodape');
    rodape.innerHTML = '';
    rodape.className = 'rodape';

    const container = document.createElement('div');
    container.className = 'container';

    // Grade do Bootstrap: 3 colunas no computador, uma embaixo da outra no celular
    const linha = document.createElement('div');
    linha.className = 'row g-4';

    // ----- Coluna 1: o projeto -----
    const colunaProjeto = document.createElement('div');
    colunaProjeto.className = 'col-md-4';

    // Ano atual com o objeto Date (aula 09)
    const ano = new Date().getFullYear();
    const textoProjeto = document.createElement('p');
    textoProjeto.textContent = `Projeto Final de Construção de Interfaces Web (CIWB), IFSP, ${ano}.`;

    colunaProjeto.appendChild(criarTituloRodape('Breaking Bad: guia de fã'));
    colunaProjeto.appendChild(textoProjeto);

    // ----- Coluna 2: integrantes -----
    const colunaGrupo = document.createElement('div');
    colunaGrupo.className = 'col-md-4';

    const listaIntegrantes = document.createElement('ul');
    listaIntegrantes.className = 'list-unstyled';

    integrantesDoGrupo.forEach(function (nome) {
        const item = document.createElement('li');
        item.textContent = nome;
        listaIntegrantes.appendChild(item);
    });

    colunaGrupo.appendChild(criarTituloRodape('Feito por'));
    colunaGrupo.appendChild(listaIntegrantes);

    // ----- Coluna 3: fonte dos dados -----
    const colunaDados = document.createElement('div');
    colunaDados.className = 'col-md-4';

    const textoDados = document.createElement('p');

    if (apiUrl) {
        // Com o link: abre a API numa nova aba
        const linkApi = document.createElement('a');
        linkApi.href = apiUrl;
        linkApi.target = '_blank';
        linkApi.rel = 'noopener';
        linkApi.textContent = 'API Breaking Bad do grupo';

        // Aviso só para o leitor de tela (visually-hidden é do Bootstrap)
        const avisoNovaAba = document.createElement('span');
        avisoNovaAba.className = 'visually-hidden';
        avisoNovaAba.textContent = ' (abre em nova aba)';
        linkApi.appendChild(avisoNovaAba);

        textoDados.appendChild(linkApi);
    } else {
        textoDados.textContent = 'API Breaking Bad do grupo';
    }

    colunaDados.appendChild(criarTituloRodape('Fonte dos dados'));
    colunaDados.appendChild(textoDados);

    // ----- Aviso final, embaixo das 3 colunas -----
    const aviso = document.createElement('p');
    aviso.className = 'rodape-aviso';
    aviso.textContent = 'Trabalho acadêmico, sem fins comerciais. Breaking Bad e seus personagens pertencem aos seus criadores.';

    linha.appendChild(colunaProjeto);
    linha.appendChild(colunaGrupo);
    linha.appendChild(colunaDados);
    container.appendChild(linha);
    container.appendChild(aviso);
    rodape.appendChild(container);
}
