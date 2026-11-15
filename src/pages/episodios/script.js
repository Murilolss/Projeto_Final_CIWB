// Página Episódios (T-23)
// Diz O QUE mostrar; o COMO fica nos services e componentes compartilhados (RNF03).
// Recurso da API: /episodes
//   Lista (Card):     código (1x01), título original (name) e title_pt.
//   Detalhes (Modal): sinopse, data de exibição, roteiro, direção e personagens.
//
// raiz = '../../', porque a página está em src/pages/episodios/.
//
// Os scripts não são módulos, então o await precisa ficar dentro de uma async function.

async function iniciarPagina() {
    // Layout comum (T-11): header e menu primeiro, porque não dependem do config.json
    montarHeader('../../');
    montarNavbar('episodios', '../../');

    // Configuração (T-12): link da API
    const config = await carregarConfig('../../');
    montarFooter(config.apiUrl);

    // Próximos passos (T-23):
    //   const itens = await buscarComCache(config.prefixoCache + 'episodios', config.apiUrl + '/episodes');
    //   montarLista(itens, ...) e a busca com filtrarPorNome a cada 'input'.
}

iniciarPagina();
