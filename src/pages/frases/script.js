// Página Frases marcantes (T-24)
// Diz O QUE mostrar; o COMO fica nos services e componentes compartilhados (RNF03).
// Recurso da API: /quotes
//   Lista (Card):     frase em português e quem fala (name).
//   Detalhes (Modal): frase em pt com o inglês abaixo, contexto e episódio; aviso nas frases com explicit.
//
// raiz = '../../', porque a página está em src/pages/frases/.
//
// Os scripts não são módulos, então o await precisa ficar dentro de uma async function.

async function iniciarPagina() {
    // Layout comum (T-11): header e menu primeiro, porque não dependem do config.json
    montarHeader('../../');
    montarNavbar('frases', '../../');

    // Configuração (T-12): link da API
    const config = await carregarConfig('../../');
    montarFooter(config.apiUrl);

    // Próximos passos (T-24):
    //   const itens = await buscarComCache(config.prefixoCache + 'frases', config.apiUrl + '/quotes');
    //   montarLista(itens, ...) e a busca com filtrarPorNome a cada 'input'.
}

iniciarPagina();
