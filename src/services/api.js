// Service api (T-13)
// Busca TODAS as páginas de um recurso da API (RF03). A API devolve 10 itens por página
// e o campo next aponta para a próxima (null na última).
//
// Função prevista: buscarTodos(url)
//   segue o next até ser null, juntando os results com forEach + push.
