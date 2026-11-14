# Requisitos — checklist

Marque `[x]` conforme for implementando. Fonte do enunciado: `contexto/slides/00-projeto-pratico-2026.md`.

## Pedidos do usuário (além do enunciado)

- [ ] **US01. Página inicial com carrossel de imagens** (carousel do Bootstrap). Ver [02-paginas-e-estrutura.md](02-paginas-e-estrutura.md#página-inicial-indexhtml).
- [ ] **US02. Configuração centralizada**: o link da API e as imagens do carrossel ficam em um arquivo de configuração, e não espalhados no código. Ver [03-configuracao.md](03-configuracao.md).

## Requisitos funcionais (enunciado)

- [ ] **RF01. Estrutura das páginas**: toda página tem cabeçalho, menu de navegação e rodapé.
- [ ] **RF02. Páginas por recurso**: uma página por tipo de conteúdo (ex.: personagens, planetas); o menu navega entre todas.
- [ ] **RF03. Listagem inicial**: ao abrir a página, lista **todos** os itens automaticamente. Se a API paginar, buscar **todas** as páginas.
- [ ] **RF04. Informações resumidas**: a lista mostra só o básico (nome + 1 ou 2 campos), nunca os dados completos.
- [ ] **RF05. Detalhes do item**: clicar em um item abre um **modal do Bootstrap** com todas as informações, preenchido via JavaScript.
- [ ] **RF06. Busca por nome**: campo de busca em cada página que filtra a lista pelo nome (enquanto digita ou ao clicar em um botão).
- [ ] **RF07. Resultado vazio**: se a busca não achar nada, mostrar uma mensagem informativa.

## Cache (enunciado)

- [ ] **RN01.** Os dados da API são salvos no **localStorage** em formato **JSON**.
- [ ] **RN02.** Antes de cada requisição, verificar se os dados já estão no localStorage; se estiverem, usar o cache em vez da API.

## Requisitos não funcionais (enunciado)

- [ ] **RNF01. Responsividade**: Bootstrap; funciona em celular, tablet e desktop.
- [ ] **RNF02. Acessibilidade básica**: `header`, `nav`, `main`, `footer`; `label` nos campos; `alt` em todas as imagens (inclusive as do carrossel).
- [ ] **RNF03. Organização**: HTML, CSS e JS em pastas e arquivos separados. Funções de API, cache e busca **reutilizadas** entre as páginas (sem copiar e colar).
- [ ] **RNF04. Tecnologias**: HTML5, CSS3, JavaScript e Bootstrap. Dados obtidos com `fetch` + `async/await` (ou `Promise`).

## Antes de entregar

- [ ] Testar cada página com o localStorage vazio (DevTools → Application → Local Storage → Clear) e depois com o cache cheio.
- [ ] Testar em largura de celular (DevTools → modo responsivo).
- [ ] Conferir se não há erros no console.
- [ ] Preencher o `README.md` do projeto.
