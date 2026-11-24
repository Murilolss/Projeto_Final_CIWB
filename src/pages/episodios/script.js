// Página Episódios

// Guardado aqui fora para a busca e o modal enxergarem depois do carregamento
let episodios = [];

// Card de UM episódio (usado pelo montarLista, do componente Card)
function criarCardDoEpisodio(episodio) {
    const linhas = [];

    // Em alguns episódios o título em português é igual ao original (ex.: Ozymandias)
    if (episodio.title_pt !== episodio.name) {
        linhas.push(episodio.title_pt);
    }
    linhas.push('Exibido em ' + formatarData(episodio.air_date));

    // O código (1x01) fica na etiqueta, no canto da foto
    const etiqueta = {
        rotulo: 'Episódio',
        texto: episodio.code,
        tipo: 'codigo'
    };

    return criarCard(episodio.name, linhas, episodio.image, function () {
        abrirEpisodio(episodio);
    }, etiqueta);
}

// O link da temporada termina no número, ex.: '.../api/seasons/2' -> '2'
function numeroDaTemporada(episodio) {
    const partes = episodio.season.split('/');
    return partes[partes.length - 1];
}

// Procura no título original e no português: "Piloto" e "Pilot" acham o 1x01
function filtrarEpisodios(termo) {
    const resultado = [];
    const procurado = termo.trim().toLowerCase();

    episodios.forEach(function (episodio) {
        if (episodio.name.toLowerCase().includes(procurado) || episodio.title_pt.toLowerCase().includes(procurado)) {
            resultado.push(episodio);
        }
    });

    return resultado;
}

// Abre o modal com todos os dados do episódio (componente Modal)
function abrirEpisodio(episodio) {
    mostrarDetalhes(episodio.name, [
        { rotulo: 'Título em português', valor: episodio.title_pt },
        { rotulo: 'Código', valor: episodio.code },
        { rotulo: 'Temporada', valor: numeroDaTemporada(episodio) },
        { rotulo: 'Número na temporada', valor: episodio.number },
        { rotulo: 'Exibido em', valor: formatarData(episodio.air_date) },
        { rotulo: 'Roteiro', valor: episodio.written_by },
        { rotulo: 'Direção', valor: episodio.directed_by },
        { rotulo: 'Sinopse', valor: episodio.synopsis },
        { rotulo: 'Personagens', valor: episodio.characters_names }   // array: uma linha por nome
    ], episodio.image);
}

async function iniciarPagina() {
    // Layout comum
    montarHeader('../../');
    montarNavbar('episodios', '../../');

    // try/catch: se o config.json ou a API falharem, o erro aparece na tela
    try {
        // Configuração
        const config = await carregarConfig('../../');
        montarFooter(config.apiUrl);

        mostrarAviso('Carregando...', 'carregando');

        // Cache antes da API, só chama a API se a chave não estiver salva
        episodios = await buscarComCache(config.prefixoCache + 'episodios', config.apiUrl + '/episodes');

        // Lista inicial com todos os episódios
        montarLista(episodios, criarCardDoEpisodio);

        // Busca por título: redesenha a lista a cada letra digitada.
        const campoBusca = document.querySelector('#busca');
        campoBusca.addEventListener('input', function () {
            montarLista(filtrarEpisodios(campoBusca.value), criarCardDoEpisodio);
        });
    } catch (erro) {
        mostrarAviso('Não foi possível carregar os dados: ' + erro.message, 'erro');
    }
}

iniciarPagina();
