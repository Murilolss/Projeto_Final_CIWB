// Service busca (T-15)
// Filtra os itens pelo nome (RF06). Todo item da API tem o campo name
// (nas frases, name é quem fala, então a busca filtra por personagem).
//
// Uso: filtrarPorNome(itens, termo)
//   itens: array com todos os itens da página
//   termo: o texto digitado no campo de busca
// Devolve um array NOVO só com os itens cujo nome contém o termo, sem ligar para
// maiúsculas, minúsculas ou espaços nas pontas. Termo vazio: devolve todos.
//
// Esta função não mexe na tela. A página redesenha a lista a cada letra digitada,
// e o montarLista (componente Card) mostra "Nenhum item encontrado" (RF07) se vier vazio:
//   campoBusca.addEventListener('input', function () {
//       montarLista(filtrarPorNome(itens, campoBusca.value), criarCardDoItem);
//   });

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
