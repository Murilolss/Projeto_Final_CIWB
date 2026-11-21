// Página Personagens (T-21)
// Diz O QUE mostrar; o COMO fica nos services e componentes compartilhados (RNF03).
// Recursos da API: /characters (61 personagens) e /deaths (64 mortes)
//   Lista (Card):     nome, ator (portrayed_by) e status, com a imagem.
//   Detalhes (Modal): todos os campos, com a imagem e o alt. Para quem morre na
//                     série, também o episódio e a causa da morte.
//
// O personagem da API só traz o link da sua morte (death), sem a causa. Por isso a
// página também busca /deaths, na mesma chave de cache da página de Mortes (ciwb_mortes):
// quem abrir uma das duas páginas (ou a inicial) já deixa as mortes salvas para a outra.
//
// raiz = '../../', porque a página está em src/pages/personagens/.
//
// Os scripts não são módulos, então o await precisa ficar dentro de uma async function.

// Guardados aqui fora para a busca e o modal enxergarem depois do carregamento
let personagens = [];
let mortes = [];

// Card de UM personagem (usado pelo montarLista, do componente Card)
function criarCardDoPersonagem(personagem) {
    const linhas = [
        'Ator: ' + personagem.portrayed_by,
        'Status: ' + personagem.status
    ];

    return criarCard(personagem.name, linhas, personagem.image, function () {
        abrirPersonagem(personagem);
    });
}

// A data de nascimento pode ser exata ('1958-09-07') ou aproximada ('c. 1958',
// 'década de 1950'). Só a exata passa pelo formatarData; a aproximada já vem
// escrita em português e aparece como está.
function formatarNascimento(data) {
    // Expressão regular (aula 15): 4 dígitos, traço, 2 dígitos, traço, 2 dígitos
    const dataExata = /^\d{4}-\d{2}-\d{2}$/;

    if (data && dataExata.test(data)) {
        return formatarData(data);
    }

    return data;   // texto aproximado, ou null (o Modal mostra "Não informado")
}

// Os links das temporadas viram os números, ex.: "1, 2, 3, 4, 5"
function numerosDasTemporadas(personagem) {
    let texto = '';

    personagem.seasons.forEach(function (link) {
        // split (aula 06): '.../api/seasons/3' vira [..., 'seasons', '3']; o número é o último pedaço
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
    // O detalhe do status (ex.: Jesse, "Fugiu do complexo...") entra entre parênteses
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
        { rotulo: 'Apelidos', valor: personagem.nicknames },          // array: uma linha por apelido
        { rotulo: 'Ator', valor: personagem.portrayed_by },
        { rotulo: 'Nascimento', valor: formatarNascimento(personagem.birth_date) },
        { rotulo: 'Status', valor: status },
        { rotulo: 'Ocupações', valor: personagem.occupations },       // array: uma linha por ocupação
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
    // Layout comum (T-11): header e menu primeiro, porque não dependem do config.json
    montarHeader('../../');
    montarNavbar('personagens', '../../');

    // try/catch: se o config.json ou a API falharem, o erro aparece na tela
    try {
        // Configuração (T-12): link da API e prefixo do cache
        const config = await carregarConfig('../../');
        montarFooter(config.apiUrl);

        mostrarAviso('Carregando...', 'carregando');

        // Cache antes da API (RN01, RN02): só chama a API se a chave não estiver salva
        personagens = await buscarComCache(config.prefixoCache + 'personagens', config.apiUrl + '/characters');
        mortes = await buscarComCache(config.prefixoCache + 'mortes', config.apiUrl + '/deaths');

        // Lista inicial com todos os personagens (RF03, RF04); o montarLista esconde o "Carregando..."
        montarLista(personagens, criarCardDoPersonagem);

        // Busca por nome (RF06): redesenha a lista a cada letra digitada.
        // Sem resultado, o montarLista mostra "Nenhum item encontrado." (RF07).
        const campoBusca = document.querySelector('#busca');
        campoBusca.addEventListener('input', function () {
            montarLista(filtrarPorNome(personagens, campoBusca.value), criarCardDoPersonagem);
        });
    } catch (erro) {
        mostrarAviso('Não foi possível carregar os dados: ' + erro.message, 'erro');
    }
}

iniciarPagina();
