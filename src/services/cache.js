// Service cache
// Guarda os dados da API no localStorage em formato JSON e, antes de cada
// requisição, verifica se eles já estão salvos. Se estiverem, usa o cache e
// não faz requisição à API. Se não estiverem, busca na API e salva no cache.

async function buscarComCache(chave, url) {
    // getItem devolve null quando a chave não existe.
    const salvo = localStorage.getItem(chave);

    if (salvo !== null) {
        // O localStorage só guarda texto: JSON.parse transforma de volta em array
        return JSON.parse(salvo);   // usa o cache: nenhuma requisição à API
    }

    // Não está no cache: busca todas as páginas na API.
    const dados = await buscarTodos(url);

    // JSON.stringify transforma o array em texto para poder salvar
    localStorage.setItem(chave, JSON.stringify(dados));
    return dados;
}
