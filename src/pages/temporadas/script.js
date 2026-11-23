// Página Temporadas

// Guardados aqui fora para a busca e o modal enxergarem depois do carregamento
let temporadas = [];
let episodios = [];

// Card de UMA temporada (usado pelo montarLista, do componente Card)
function criarCardDaTemporada(temporada) {
    const linhas = [
        temporada.episodes_count + ' episódios',
        'De ' + formatarData(temporada.premiere_date) + ' a ' + formatarData(temporada.finale_date)
    ];

    return criarCard(temporada.name, linhas, temporada.image, function () {
        abrirTemporada(temporada);
    });
}

// Monta uma linha de texto para cada episódio da temporada.
function episodiosDaTemporada(temporada) {
    const linhas = [];

    // O episódio guarda o link da sua temporada: se for o link desta, ele entra.
    // A API já entrega os episódios em ordem (1x01, 1x02...).
    episodios.forEach(function (episodio) {
        if (episodio.season === temporada.url) {
            linhas.push(`${episodio.code} · ${episodio.name} (${episodio.title_pt}) · ${formatarData(episodio.air_date)}`);
        }
    });

    return linhas;
}

// Abre o modal com todos os dados da temporada (componente Modal)
function abrirTemporada(temporada) {
    mostrarDetalhes(temporada.name, [
        { rotulo: 'Número', valor: temporada.number },
        { rotulo: 'Quantidade de episódios', valor: temporada.episodes_count },
        { rotulo: 'Estreia', valor: formatarData(temporada.premiere_date) },
        { rotulo: 'Último episódio', valor: formatarData(temporada.finale_date) },
        { rotulo: 'Episódios', valor: episodiosDaTemporada(temporada) }   // array: uma linha por episódio
    ], temporada.image);
}

async function iniciarPagina() {
    // Layout comum
    montarHeader('../../');
    montarNavbar('temporadas', '../../');

    // try/catch: se o config.json ou a API falharem, o erro aparece na tela
    try {
        // Configuração
        const config = await carregarConfig('../../');
        montarFooter(config.apiUrl);

        mostrarAviso('Carregando...', 'carregando');

        // Cache antes da API, só chama a API se a chave não estiver salva
        temporadas = await buscarComCache(config.prefixoCache + 'temporadas', config.apiUrl + '/seasons');
        episodios = await buscarComCache(config.prefixoCache + 'episodios', config.apiUrl + '/episodes');

        // Lista inicial com todas as temporadas
        montarLista(temporadas, criarCardDaTemporada);

        // Busca por nome : redesenha a lista a cada letra digitada.
        const campoBusca = document.querySelector('#busca');
        campoBusca.addEventListener('input', function () {
            montarLista(filtrarPorNome(temporadas, campoBusca.value), criarCardDaTemporada);
        });
    } catch (erro) {
        mostrarAviso('Não foi possível carregar os dados: ' + erro.message, 'erro');
    }
}

iniciarPagina();
