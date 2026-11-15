# Requisitos — checklist

Marque `[x]` conforme for implementando. Fonte do enunciado: `contexto/slides/00-projeto-pratico-2026.md`.

## Pedidos do usuário (além do enunciado)

- [ ] **US01. Página inicial com carrossel de imagens** (carousel do Bootstrap). Ver [02-paginas-e-estrutura.md](02-paginas-e-estrutura.md#página-inicial-indexhtml).
- [ ] **US02. Configuração centralizada**: o link da API e as imagens do carrossel ficam em um arquivo de configuração, e não espalhados no código. Ver [03-configuracao.md](03-configuracao.md).

## Requisitos funcionais (enunciado)

- [x] **RF01. Estrutura das páginas**: toda página tem cabeçalho, menu de navegação e rodapé. *(T-11, 14/11/2026: `montarHeader`, `montarNavbar` e `montarFooter` em `src/components/`, chamados nas 5 páginas.)*
- [ ] **RF02. Páginas por recurso**: uma página por tipo de conteúdo (ex.: personagens, planetas); o menu navega entre todas. *(O menu já liga as 5 páginas (T-11); faltam os conteúdos das páginas de recurso, T-21 a T-24.)*
- [ ] **RF03. Listagem inicial**: ao abrir a página, lista **todos** os itens automaticamente. Se a API paginar, buscar **todas** as páginas. *(T-13, 14/11/2026: `buscarTodos(url)` em `src/services/api.js` segue o `next` até `null` e junta os `results`. Falta as páginas listarem os itens, T-21 a T-24.)*
- [ ] **RF04. Informações resumidas**: a lista mostra só o básico (nome + 1 ou 2 campos), nunca os dados completos.
- [ ] **RF05. Detalhes do item**: clicar em um item abre um **modal do Bootstrap** com todas as informações, preenchido via JavaScript.
- [ ] **RF06. Busca por nome**: campo de busca em cada página que filtra a lista pelo nome (enquanto digita ou ao clicar em um botão).
- [ ] **RF07. Resultado vazio**: se a busca não achar nada, mostrar uma mensagem informativa.

## Cache (enunciado)

- [ ] **RN01.** Os dados da API são salvos no **localStorage** em formato **JSON**.
- [ ] **RN02.** Antes de cada requisição, verificar se os dados já estão no localStorage; se estiverem, usar o cache em vez da API.

## Requisitos não funcionais (enunciado)

- [ ] **RNF01. Responsividade**: Bootstrap; funciona em celular, tablet e desktop. *(Header, navbar e footer já são responsivos: o menu recolhe abaixo de 992px. Testado em 375px.)*
- [ ] **RNF02. Acessibilidade básica**: `header`, `nav`, `main`, `footer`; `label` nos campos; `alt` em todas as imagens (inclusive as do carrossel). *(Feito no layout: tags semânticas, `aria-current` no menu, `aria-label` no logo e no `nav`, aviso de nova aba no link da API. Faltam os `label` da busca e os `alt`.)*
- [ ] **RNF03. Organização**: HTML, CSS e JS em pastas e arquivos separados. Funções de API, cache e busca **reutilizadas** entre as páginas (sem copiar e colar).
- [ ] **RNF04. Tecnologias**: HTML5, CSS3, JavaScript e Bootstrap. Dados obtidos com `fetch` + `async/await` (ou `Promise`). *(Já usados em `carregarConfig` (T-12) e `buscarTodos` (T-13).)*

## Antes de entregar

- [ ] Testar cada página com o localStorage vazio (DevTools → Application → Local Storage → Clear) e depois com o cache cheio.
- [ ] Testar em largura de celular (DevTools → modo responsivo).
- [ ] Conferir se não há erros no console.
- [ ] Preencher o `README.md` do projeto.
