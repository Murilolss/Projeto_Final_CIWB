// Service api
// Busca TODAS as páginas atraves da API. A API devolve 10 itens por página
// e o campo next aponta para a próxima (null na última).


async function buscarTodos(url) {
    const todos = [];

    // Repete enquanto houver página: url vira null depois da última
    while (url) {
        const resposta = await fetch(url);

        // resposta.ok é false quando a API devolve erro.
        if (!resposta.ok) {
            throw new Error('Erro ao acessar a API (' + resposta.status + ')');
        }

        // Converte o JSON da página em objeto
        const json = await resposta.json();

        // Junta os itens desta página no array de todos
        json.results.forEach(function (item) {
            todos.push(item);
        });

        url = json.next; // link da próxima página, ou null na última
    }

    return todos;
}
