// Página Personagens (T-21)
// Diz O QUE mostrar; o COMO fica nos services e componentes compartilhados (RNF03).
// Recurso da API: /characters
//   Lista (Card):     nome, ator (portrayed_by) e status, com a imagem.
//   Detalhes (Modal): todos os campos, com a imagem e o alt.
//
// raiz = '../../', porque a página está em src/pages/personagens/.
//
// Os scripts não são módulos, então o await precisa ficar dentro de uma async function.

async function iniciarPagina() {
    // Layout comum (T-11): header e menu primeiro, porque não dependem do config.json
    montarHeader('../../');
    montarNavbar('personagens', '../../');

    // Configuração (T-12): link da API
    const config = await carregarConfig('../../');
    montarFooter(config.apiUrl);

    // Próximos passos (T-21):
    //   const itens = await buscarComCache(config.prefixoCache + 'personagens', config.apiUrl + '/characters');
    //   montarLista(itens, ...) e a busca com filtrarPorNome a cada 'input'.
}

iniciarPagina();
