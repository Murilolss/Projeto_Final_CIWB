// Página Mortes (T-22)
// Diz O QUE mostrar; o COMO fica nos services e componentes compartilhados (RNF03).
// Recurso da API: /deaths
//   Lista (Card):     vítima (name), episódio (episode_code) e responsáveis.
//   Detalhes (Modal): causa, arma, responsáveis e últimas palavras em pt, en e, quando houver, no original.
//
// raiz = '../../', porque a página está em src/pages/mortes/.
//
// Os scripts não são módulos, então o await precisa ficar dentro de uma async function.

async function iniciarPagina() {
    // Layout comum (T-11): header e menu primeiro, porque não dependem do config.json
    montarHeader('../../');
    montarNavbar('mortes', '../../');

    // Configuração (T-12): link da API
    const config = await carregarConfig('../../');
    montarFooter(config.apiUrl);

    // Próximos passos (T-22):
    //   const itens = await buscarComCache(config.prefixoCache + 'mortes', config.apiUrl + '/deaths');
    //   montarLista(itens, ...) e a busca com filtrarPorNome a cada 'input'.
}

iniciarPagina();
