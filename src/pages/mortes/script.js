// Página Mortes (T-22)
// Diz O QUE mostrar; o COMO fica nos services e componentes compartilhados (RNF03).
// Recurso da API: /deaths
//   Lista (Card):     vítima (name), episódio (episode_code) e responsáveis.
//   Detalhes (Modal): causa, arma, responsáveis e últimas palavras em pt, en e, quando houver, no original.
//
// Fluxo previsto (raiz = '../../', porque a página está em src/pages/mortes/):
//   montarHeader('../../');
//   montarNavbar('mortes', '../../');
//   montarFooter();
//   const config = await carregarConfig('../../');
//   const itens = await buscarComCache(config.prefixoCache + 'mortes', config.apiUrl + '/deaths');
//   montarLista(itens, ...) e a busca com filtrarPorNome a cada 'input'.
