// Service cache (T-14)
// Guarda os dados da API no localStorage (RN01, RN02), com o prefixo do config.json (ciwb_).
//
// Função prevista: buscarComCache(chave, url)
//   - se localStorage.getItem(chave) existir: usa JSON.parse e NÃO faz requisição;
//   - senão: chama buscarTodos(url) (api.js) e salva com JSON.stringify.
