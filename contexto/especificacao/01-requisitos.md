# Requisitos — checklist

Marque `[x]` conforme for implementando. Fonte do enunciado: `contexto/slides/00-projeto-pratico-2026.md`.

## Pedidos do usuário (além do enunciado)

- [x] **US01. Página inicial com carrossel de imagens** (carousel do Bootstrap). *(T-19, 20/11/2026: 10 cenas da rota `/carousel`, com cache, autoplay e legenda.)* Ver [02-paginas-e-estrutura.md](02-paginas-e-estrutura.md#página-inicial-indexhtml).
- [ ] **US02. Configuração centralizada**: o link da API fica em um arquivo de configuração (`src/config.json`), e não espalhado no código. As imagens do carrossel vêm da API (`/api/carousel`), a partir desse link (mudança pedida pelo usuário em 17/11/2026, na T-18). Ver [03-configuracao.md](03-configuracao.md).

## Requisitos funcionais (enunciado)

- [x] **RF01. Estrutura das páginas**: toda página tem cabeçalho, menu de navegação e rodapé. *(T-11, 14/11/2026: `montarHeader`, `montarNavbar` e `montarFooter` em `src/components/`, chamados nas 5 páginas.)*
- [ ] **RF02. Páginas por recurso**: uma página por tipo de conteúdo (ex.: personagens, planetas); o menu navega entre todas. *(O menu liga as 6 páginas (T-11; Temporadas entrou na T-25, 20/11/2026). **Temporadas pronta** (T-26); faltam os conteúdos das outras páginas de recurso, T-21 a T-24.)*
- [ ] **RF03. Listagem inicial**: ao abrir a página, lista **todos** os itens automaticamente. Se a API paginar, buscar **todas** as páginas. *(T-13, 14/11/2026: `buscarTodos(url)` em `src/services/api.js` segue o `next` até `null` e junta os `results`. Temporadas já lista as 5 e busca os 62 episódios em 7 páginas (T-26). Falta as outras páginas listarem os itens, T-21 a T-24.)*
- [ ] **RF04. Informações resumidas**: a lista mostra só o básico (nome + 1 ou 2 campos), nunca os dados completos. *(T-16, 15/11/2026: `criarCard(titulo, linhas, imagem, aoClicar)` e `montarLista(itens, criarCardDoItem)` em `src/components/Card/card.js`, com grade responsiva e “Ver detalhes”. Os campos de cada recurso ficam no `script.js` da página. Temporadas já usa (T-26). Falta as outras páginas usarem, T-21 a T-24.)*
- [ ] **RF05. Detalhes do item**: clicar em um item abre um **modal do Bootstrap** com todas as informações, preenchido via JavaScript. *(T-17, 17/11/2026: `mostrarDetalhes(titulo, campos, imagem)` em `src/components/Modal/modal.js` cria o modal na 1ª chamada, limpa e preenche o corpo com todos os campos (“Não informado” quando falta o valor) e abre com `bootstrap.Modal.getOrCreateInstance(...).show()`. Temporadas já monta os campos e a lista de todos os episódios (T-26). Falta as outras páginas, T-21 a T-24.)*
- [ ] **RF06. Busca por nome**: campo de busca em cada página que filtra a lista pelo nome (enquanto digita ou ao clicar em um botão). *(T-15, 15/11/2026: `filtrarPorNome(itens, termo)` em `src/services/busca.js`, com `trim` + `toLowerCase` + `includes`. Não ignora acentos: “tomas” não acha “Tomás”. Temporadas já tem o campo com `label` e o evento `input` (T-26). Falta nas outras páginas, T-21 a T-24.)*
- [ ] **RF07. Resultado vazio**: se a busca não achar nada, mostrar uma mensagem informativa. *(T-15/T-16, 15/11/2026: o `montarLista` mostra “Nenhum item encontrado.” com o `mostrarAviso(texto, 'vazio')`, de `src/components/Aviso/aviso.js`, quando recebe a lista vazia.)*

## Cache (enunciado)

- [ ] **RN01.** Os dados da API são salvos no **localStorage** em formato **JSON**. *(T-14, 15/11/2026: `buscarComCache(chave, url)` em `src/services/cache.js` salva a lista inteira com `JSON.stringify` na chave `ciwb_<recurso>`. Temporadas já usa, com `ciwb_temporadas` e `ciwb_episodios` (T-26). Falta as outras páginas, T-21 a T-24.)*
- [ ] **RN02.** Antes de cada requisição, verificar se os dados já estão no localStorage; se estiverem, usar o cache em vez da API. *(T-14, 15/11/2026: `buscarComCache` olha o `getItem` antes; se não for `null`, devolve o `JSON.parse` sem chamar a API. Testado em Temporadas: com o cache cheio, nenhuma requisição (T-26). Falta as outras páginas, T-21 a T-24.)*

## Requisitos não funcionais (enunciado)

- [ ] **RNF01. Responsividade**: Bootstrap; funciona em celular, tablet e desktop. *(Header, navbar e footer já são responsivos: o menu recolhe abaixo de 992px. Testado em 375px.)*
- [ ] **RNF02. Acessibilidade básica**: `header`, `nav`, `main`, `footer`; `label` nos campos; `alt` em todas as imagens (inclusive as do carrossel). *(Feito no layout: tags semânticas, `aria-current` no menu, `aria-label` no logo e no `nav`, aviso de nova aba no link da API. Os cards (T-16) têm `alt` com o nome do item, `h2` dentro do `h1` da página e um botão de verdade para o teclado; o Aviso usa `role="alert"` / `role="status"`. Os `alt` do carrossel vêm do campo `description` de `/api/carousel` (T-18/T-19). O `label` da busca já está em Temporadas (T-26); faltam os das outras páginas.)*
- [ ] **RNF03. Organização**: HTML, CSS e JS em pastas e arquivos separados. Funções de API, cache e busca **reutilizadas** entre as páginas (sem copiar e colar).
- [ ] **RNF04. Tecnologias**: HTML5, CSS3, JavaScript e Bootstrap. Dados obtidos com `fetch` + `async/await` (ou `Promise`). *(Já usados em `carregarConfig` (T-12) e `buscarTodos` (T-13).)*

## Antes de entregar

- [ ] Testar cada página com o localStorage vazio (DevTools → Application → Local Storage → Clear) e depois com o cache cheio.
- [ ] Testar em largura de celular (DevTools → modo responsivo).
- [ ] Conferir se não há erros no console.
- [ ] Preencher o `README.md` do projeto.
