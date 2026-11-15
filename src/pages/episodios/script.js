// Página Episódios (T-23)
// Diz O QUE mostrar; o COMO fica nos services e componentes compartilhados (RNF03).
// Recurso da API: /episodes
//   Lista (Card):     código (1x01), título original (name) e title_pt.
//   Detalhes (Modal): sinopse, data de exibição, roteiro, direção e personagens.
//
// Fluxo previsto (raiz = '../../', porque a página está em src/pages/episodios/):
//   montarHeader('../../');
//   montarNavbar('episodios', '../../');
//   montarFooter();
//   const config = await carregarConfig('../../');
//   const itens = await buscarComCache(config.prefixoCache + 'episodios', config.apiUrl + '/episodes');
//   montarLista(itens, ...) e a busca com filtrarPorNome a cada 'input'.
