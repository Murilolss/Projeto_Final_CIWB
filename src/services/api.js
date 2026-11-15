// Service api (T-13)
// Busca TODAS as páginas de um recurso da API (RF03). A API devolve 10 itens por página
// e o campo next aponta para a próxima (null na última).
//
// url: endereço da primeira página do recurso (ex.: config.apiUrl + '/characters').
// Devolve um array com os itens de todas as páginas juntos.
//
// Uso (dentro de uma async function):
//   const personagens = await buscarTodos(config.apiUrl + '/characters');
//   console.log(personagens.length); // 61

async function buscarTodos(url) {
    const todos = [];

    // Repete enquanto houver página: url vira null depois da última
    while (url) {
        const resposta = await fetch(url);

        // resposta.ok é false quando a API devolve erro (ex.: 404, recurso ou página inexistente)
        if (!resposta.ok) {
            throw new Error('Erro ao acessar a API (' + resposta.status + ')');
        }

        // Converte o JSON da página em objeto: { count, next, previous, results }
        const json = await resposta.json();

        // Junta os itens desta página no array de todos
        json.results.forEach(function (item) {
            todos.push(item);
        });

        url = json.next;   // link da próxima página, ou null na última
    }

    return todos;
}
