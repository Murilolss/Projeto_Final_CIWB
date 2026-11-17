// Componente Carrossel (T-19), usado só no index.html
// Recebe os slides da rota /carousel da API (lidos com buscarComCache) e monta o
// carousel do Bootstrap: um .carousel-item por slide (o primeiro com active),
// indicadores e controles anterior/próximo com texto visually-hidden.
// Cada slide tem image (src), description (alt, RNF02) e name (legenda).
// As imagens têm proporções diferentes (16:9, 4:3, 3:2): usar altura fixa + object-fit: cover.
//
// Função prevista: montarCarrossel(slides)
