// Página Temporadas (T-25 e T-26)
// Diz O QUE mostrar; o COMO fica nos services e componentes compartilhados (RNF03).
// Recursos da API: /seasons (5 temporadas) e /episodes (62 episódios)
//   Lista (Card):     nome, quantidade de episódios e período de exibição.
//   Detalhes (Modal): número, quantidade, estreia, último episódio e TODOS os episódios.
//
// Cada temporada da API traz só os links dos episódios, sem o título. Por isso a página
// também busca /episodes, na mesma chave de cache da página de Episódios (ciwb_episodios):
// quem abrir uma das duas páginas já deixa os episódios salvos para a outra.
//
// raiz = '../../', porque a página está em src/pages/temporadas/.
//
// Os scripts não são módulos, então o await precisa ficar dentro de uma async function.

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

// Monta uma linha de texto para cada episódio da temporada, ex.:
// "1x01 · Pilot (Piloto) · 20/01/2008"
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
    // Layout comum (T-11): header e menu primeiro, porque não dependem do config.json
    montarHeader('../../');
    montarNavbar('temporadas', '../../');

    // try/catch: se o config.json ou a API falharem, o erro aparece na tela
    try {
        // Configuração (T-12): link da API e prefixo do cache
        const config = await carregarConfig('../../');
        montarFooter(config.apiUrl);

        mostrarAviso('Carregando...', 'carregando');

        // Cache antes da API (RN01, RN02): só chama a API se a chave não estiver salva
        temporadas = await buscarComCache(config.prefixoCache + 'temporadas', config.apiUrl + '/seasons');
        episodios = await buscarComCache(config.prefixoCache + 'episodios', config.apiUrl + '/episodes');

        // Lista inicial com todas as temporadas (RF03, RF04); o montarLista esconde o "Carregando..."
        montarLista(temporadas, criarCardDaTemporada);

        // Busca por nome (RF06): redesenha a lista a cada letra digitada.
        // Sem resultado, o montarLista mostra "Nenhum item encontrado." (RF07).
        const campoBusca = document.querySelector('#busca');
        campoBusca.addEventListener('input', function () {
            montarLista(filtrarPorNome(temporadas, campoBusca.value), criarCardDaTemporada);
        });
    } catch (erro) {
        mostrarAviso('Não foi possível carregar os dados: ' + erro.message, 'erro');
    }
}

iniciarPagina();
