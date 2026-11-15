// Página Frases marcantes (T-24)
// Diz O QUE mostrar; o COMO fica nos services e componentes compartilhados (RNF03).
// Recurso da API: /quotes
//   Lista (Card):     frase em português e quem fala (name).
//   Detalhes (Modal): frase em pt com o inglês abaixo, contexto e episódio; aviso nas frases com explicit.
//
// Fluxo previsto (raiz = '../../', porque a página está em src/pages/frases/):
//   montarHeader('../../');
//   montarNavbar('frases', '../../');
//   montarFooter();
//   const config = await carregarConfig('../../');
//   const itens = await buscarComCache(config.prefixoCache + 'frases', config.apiUrl + '/quotes');
//   montarLista(itens, ...) e a busca com filtrarPorNome a cada 'input'.
