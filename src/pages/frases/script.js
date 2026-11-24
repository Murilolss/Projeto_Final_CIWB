// Página Frases marcantes

// Guardado aqui fora para a busca e o modal enxergarem depois do carregamento
let frases = [];

// Card de UMA frase (usado pelo montarLista, do componente Card).
// As frases não têm foto: a própria frase vira o título do card.
function criarCardDaFrase(frase) {
    const titulo = '“' + frase.quote.pt + '”';

    const linhas = [
        frase.name,
        'Episódio ' + frase.episode_code
    ];

    // Só as 4 frases com palavrão ganham a etiqueta
    let etiqueta = null;
    if (frase.explicit) {
        etiqueta = {
            rotulo: 'Aviso',
            texto: 'Palavrão',
            tipo: 'palavrao'
        };
    }

    return criarCard(titulo, linhas, null, function () {
        abrirFrase(frase);
    }, etiqueta);
}

// A frase não tem o campo season: o número vem do código, ex.: '5x07' -> '5'
function numeroDaTemporada(frase) {
    const partes = frase.episode_code.split('x');
    return partes[0];
}

// Abre o modal com todos os dados da frase (componente Modal)
function abrirFrase(frase) {
    const campos = [];

    // O aviso vem antes do texto da frase
    if (frase.explicit) {
        campos.push({ rotulo: 'Aviso', valor: 'Contém palavrão' });
    }

    campos.push({ rotulo: 'Frase', valor: frase.quote.pt });
    campos.push({ rotulo: 'Em inglês', valor: frase.quote.en, idioma: 'en' });
    campos.push({ rotulo: 'Contexto', valor: frase.context });
    campos.push({ rotulo: 'Temporada', valor: numeroDaTemporada(frase) });
    campos.push({ rotulo: 'Episódio', valor: frase.episode_code });

    mostrarDetalhes(frase.name, campos, null);
}

async function iniciarPagina() {
    // Layout comum
    montarHeader('../../');
    montarNavbar('frases', '../../');

    // try/catch: se o config.json ou a API falharem, o erro aparece na tela
    try {
        // Configuração
        const config = await carregarConfig('../../');
        montarFooter(config.apiUrl);

        mostrarAviso('Carregando...', 'carregando');

        // Cache antes da API, só chama a API se a chave não estiver salva
        frases = await buscarComCache(config.prefixoCache + 'frases', config.apiUrl + '/quotes');

        // Lista inicial com todas as frases
        montarLista(frases, criarCardDaFrase);

        // Busca por quem fala: redesenha a lista a cada letra digitada.
        const campoBusca = document.querySelector('#busca');
        campoBusca.addEventListener('input', function () {
            montarLista(filtrarPorNome(frases, campoBusca.value), criarCardDaFrase);
        });
    } catch (erro) {
        mostrarAviso('Não foi possível carregar os dados: ' + erro.message, 'erro');
    }
}

iniciarPagina();
