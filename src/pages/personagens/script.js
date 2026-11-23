// Página Personagens

// Guardados aqui fora para a busca e o modal enxergarem depois do carregamento
let personagens = [];
let mortes = [];

// Card de UM personagem (usado pelo montarLista, do componente Card)
function criarCardDoPersonagem(personagem) {
    const linhas = ['Ator: ' + personagem.portrayed_by];

    // Status colorido: o status em minúsculas vira a classe da cor
    // ('Morto' -> 'morto' -> .etiqueta-morto, no style.css desta página)
    const etiqueta = {
        rotulo: 'Status',
        texto: personagem.status,
        tipo: personagem.status.toLowerCase()
    };

    return criarCard(personagem.name, linhas, personagem.image, function () {
        abrirPersonagem(personagem);
    }, etiqueta);
}


function formatarNascimento(data) {
    const dataExata = /^\d{4}-\d{2}-\d{2}$/;

    if (data && dataExata.test(data)) {
        return formatarData(data);
    }

    return data;
}

function numerosDasTemporadas(personagem) {
    let texto = '';

    personagem.seasons.forEach(function (link) {

        const partes = link.split('/');
        const numero = partes[partes.length - 1];

        if (texto === '') {
            texto = numero;
        } else {
            texto = texto + ', ' + numero;
        }
    });

    return texto;
}

// Procura, entre as mortes, a que tem o mesmo link do campo death do personagem
function morteDoPersonagem(personagem) {
    let encontrada = null;

    mortes.forEach(function (morte) {
        if (morte.url === personagem.death) {
            encontrada = morte;
        }
    });

    return encontrada;
}

// Abre o modal com todos os dados do personagem (componente Modal)
function abrirPersonagem(personagem) {
    let status = personagem.status;
    if (personagem.status_detail) {
        status = status + ' (' + personagem.status_detail + ')';
    }

    let papel = 'Recorrente';
    if (personagem.role === 'principal') {
        papel = 'Elenco principal';
    }

    const campos = [
        { rotulo: 'Nome completo', valor: personagem.full_name },
        { rotulo: 'Apelidos', valor: personagem.nicknames },      
        { rotulo: 'Ator', valor: personagem.portrayed_by },
        { rotulo: 'Nascimento', valor: formatarNascimento(personagem.birth_date) },
        { rotulo: 'Status', valor: status },
        { rotulo: 'Ocupações', valor: personagem.occupations }, 
        { rotulo: 'Papel na série', valor: papel },
        { rotulo: 'Temporadas', valor: numerosDasTemporadas(personagem) },
        { rotulo: 'Primeira aparição', valor: personagem.first_appearance },
        { rotulo: 'Última aparição', valor: personagem.last_appearance }
    ];

    // Só quem morre na série tem o campo death: aí entram a morte e a causa
    if (personagem.death) {
        const morte = morteDoPersonagem(personagem);
        if (morte !== null) {
            campos.push({ rotulo: 'Episódio da morte', valor: morte.episode_code });
            campos.push({ rotulo: 'Causa da morte', valor: morte.cause });
        }
    }

    mostrarDetalhes(personagem.name, campos, personagem.image);
}

async function iniciarPagina() {
    // Layout comum
    montarHeader('../../');
    montarNavbar('personagens', '../../');

    // try/catch: se o config.json ou a API falharem, o erro aparece na tela
    try {
        // Configuração
        const config = await carregarConfig('../../');
        montarFooter(config.apiUrl);

        mostrarAviso('Carregando...', 'carregando');

        // Cache antes da API, só chama a API se a chave não estiver salva
        personagens = await buscarComCache(config.prefixoCache + 'personagens', config.apiUrl + '/characters');
        mortes = await buscarComCache(config.prefixoCache + 'mortes', config.apiUrl + '/deaths');

        // Lista inicial com todos os personagens
        montarLista(personagens, criarCardDoPersonagem);

        // Busca por nome : redesenha a lista a cada letra digitada.
        const campoBusca = document.querySelector('#busca');
        campoBusca.addEventListener('input', function () {
            montarLista(filtrarPorNome(personagens, campoBusca.value), criarCardDoPersonagem);
        });
    } catch (erro) {
        mostrarAviso('Não foi possível carregar os dados: ' + erro.message, 'erro');
    }
}

iniciarPagina();
