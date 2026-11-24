// Página Mortes

// Guardado aqui fora para a busca e o modal enxergarem depois do carregamento
let mortes = [];

// Os responsáveis viram um texto só, ex.: "Leonel Salamanca, Marco Salamanca"
function textoDosResponsaveis(morte) {
    let texto = '';

    morte.responsible.forEach(function (nome) {
        if (texto === '') {
            texto = nome;
        } else {
            texto = texto + ', ' + nome;
        }
    });

    return texto;
}

// Card de UMA morte (usado pelo montarLista, do componente Card)
function criarCardDaMorte(morte) {
    let rotuloResponsaveis = 'Responsáveis: ';
    if (morte.responsible.length === 1) {
        rotuloResponsaveis = 'Responsável: ';
    }

    const linhas = [
        'Episódio ' + morte.episode_code,
        rotuloResponsaveis + textoDosResponsaveis(morte)
    ];

    // Só as mortes em grupo ganham a etiqueta com o número de vítimas
    let etiqueta = null;
    if (morte.victims_count > 1) {
        etiqueta = {
            rotulo: 'Morte em grupo',
            texto: morte.victims_count + ' vítimas',
            tipo: 'grupo'
        };
    }

    return criarCard(morte.name, linhas, morte.image, function () {
        abrirMorte(morte);
    }, etiqueta);
}

// O link da temporada termina no número, ex.: '.../api/seasons/2' -> '2'
function numeroDaTemporada(morte) {
    const partes = morte.season.split('/');
    return partes[partes.length - 1];
}

// Abre o modal com todos os dados da morte (componente Modal)
function abrirMorte(morte) {
    const campos = [
        { rotulo: 'Vítimas', valor: morte.victims_count },
        { rotulo: 'Causa', valor: morte.cause },
        { rotulo: 'Arma', valor: morte.weapon },
        { rotulo: 'Responsáveis', valor: morte.responsible },
        { rotulo: 'Temporada', valor: numeroDaTemporada(morte) },
        { rotulo: 'Episódio', valor: morte.episode_code }
    ];

    // Sem últimas palavras, o Modal mostra "Não informado"
    if (morte.last_words === null) {
        campos.push({ rotulo: 'Últimas palavras', valor: null });
    } else {
        campos.push({ rotulo: 'Últimas palavras', valor: morte.last_words.pt });
        campos.push({ rotulo: 'Em inglês', valor: morte.last_words.en, idioma: 'en' });

        // Só existe quando a fala original é em espanhol ou alemão
        if (morte.last_words.original) {
            campos.push({ rotulo: 'No idioma original', valor: morte.last_words.original });
        }
    }

    mostrarDetalhes(morte.name, campos, morte.image);
}

async function iniciarPagina() {
    // Layout comum
    montarHeader('../../');
    montarNavbar('mortes', '../../');

    // try/catch: se o config.json ou a API falharem, o erro aparece na tela
    try {
        // Configuração
        const config = await carregarConfig('../../');
        montarFooter(config.apiUrl);

        mostrarAviso('Carregando...', 'carregando');

        // Cache antes da API, só chama a API se a chave não estiver salva
        mortes = await buscarComCache(config.prefixoCache + 'mortes', config.apiUrl + '/deaths');

        // Lista inicial com todas as mortes
        montarLista(mortes, criarCardDaMorte);

        // Busca por nome: redesenha a lista a cada letra digitada.
        const campoBusca = document.querySelector('#busca');
        campoBusca.addEventListener('input', function () {
            montarLista(filtrarPorNome(mortes, campoBusca.value), criarCardDaMorte);
        });
    } catch (erro) {
        mostrarAviso('Não foi possível carregar os dados: ' + erro.message, 'erro');
    }
}

iniciarPagina();
