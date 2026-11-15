// Service cache (T-14)
// Guarda os dados da API no localStorage em formato JSON (RN01) e, antes de cada
// requisição, verifica se eles já estão salvos (RN02). Se estiverem, usa o cache e
// NÃO chama a API.
//
// chave: nome do item no localStorage, já com o prefixo do config.json
//        (ex.: config.prefixoCache + 'personagens' → 'ciwb_personagens').
// url:   endereço da primeira página do recurso, repassado para buscarTodos (api.js).
// Devolve o array com todos os itens do recurso (do cache ou da API).
//
// Uso (dentro de uma async function):
//   const personagens = await buscarComCache(config.prefixoCache + 'personagens', config.apiUrl + '/characters');
//   console.log(personagens.length); // 61
//
// Para testar com o cache vazio: DevTools → Application → Local Storage → Clear.

async function buscarComCache(chave, url) {
    // getItem devolve null quando a chave não existe (aula 13)
    const salvo = localStorage.getItem(chave);

    if (salvo !== null) {
        // O localStorage só guarda texto: JSON.parse transforma de volta em array
        return JSON.parse(salvo);   // usa o cache: nenhuma requisição à API
    }

    // Não está no cache: busca todas as páginas na API (T-13).
    // Se a API falhar, o throw do buscarTodos para a função aqui e nada é salvo,
    // então a próxima visita tenta a API de novo.
    const dados = await buscarTodos(url);

    // JSON.stringify transforma o array em texto para poder salvar
    localStorage.setItem(chave, JSON.stringify(dados));
    return dados;
}
