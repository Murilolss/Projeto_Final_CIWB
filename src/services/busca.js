// Service busca
// Filtra os itens pelo nome. Todo item da API tem o campo name
// Esta função não mexe na tela. A página redesenha a lista a cada letra digitada,
// e o montarLista (componente Card) mostra "Nenhum item encontrado" se vier vazio.

function filtrarPorNome(itens, termo) {
    const resultado = [];
    const procurado = termo.trim().toLowerCase();

    itens.forEach(function (item) {
        if (item.name.toLowerCase().includes(procurado)) {
            resultado.push(item);
        }
    });

    return resultado;
}
