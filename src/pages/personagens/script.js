// Página Personagens (T-21)
// Diz O QUE mostrar; o COMO fica nos services e componentes compartilhados (RNF03).
// Recurso da API: /characters
//   Lista (Card):     nome, ator (portrayed_by) e status, com a imagem.
//   Detalhes (Modal): todos os campos, com a imagem e o alt.
//
// Fluxo previsto (raiz = '../../', porque a página está em src/pages/personagens/):
//   montarHeader('../../');
//   montarNavbar('personagens', '../../');
//   montarFooter();
//   const config = await carregarConfig('../../');
//   const itens = await buscarComCache(config.prefixoCache + 'personagens', config.apiUrl + '/characters');
//   montarLista(itens, ...) e a busca com filtrarPorNome a cada 'input'.
