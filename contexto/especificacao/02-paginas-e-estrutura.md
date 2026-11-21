# Páginas e estrutura

## Mapa de páginas

| Página | Arquivo | Conteúdo |
|--------|---------|----------|
| Início | `src/index.html` | Apresentação do site + **carrossel de imagens** |
| Personagens | `src/pages/personagens/index.html` | Busca + lista resumida + modal de detalhes |
| Mortes | `src/pages/mortes/index.html` | idem |
| Temporadas | `src/pages/temporadas/index.html` | idem. O modal lista **todos os episódios** da temporada. Aprovada na T-25 e **implementada** na T-26 (20/11/2026) |
| Episódios | `src/pages/episodios/index.html` | idem |
| Frases marcantes | `src/pages/frases/index.html` | idem |

Ordem do menu (`paginasDoMenu`, em `navbar.js`), desde 20/11/2026: Início · Personagens · Mortes · **Temporadas** · Episódios · Frases marcantes. Temporadas vem antes de Episódios, do geral para o específico (escolha do usuário).

## Layout comum (RF01, RNF02)

Toda página, inclusive a inicial, segue o mesmo esqueleto. Os contêineres ficam vazios no HTML e são preenchidos pelos **componentes** (funções JS, ver "Estrutura de pastas"):

```html
<header id="cabecalho"></header>  <!-- montarHeader(raiz): título + ladrilho .elemento -->
<nav id="menu"></nav>             <!-- montarNavbar(paginaAtual, raiz): navbar do Bootstrap, recolhe no celular -->
<main> conteúdo próprio da página </main>
<footer id="rodape"></footer>     <!-- montarFooter(apiUrl): autoria, disciplina, fonte dos dados -->
```

- O menu marca a página atual (classe `active` + `aria-current="page"`), a partir do parâmetro `paginaAtual`. As páginas do menu ficam no array `paginasDoMenu`, em `navbar.js`: uma página nova no menu é só mais um objeto nesse array.
- O rodapé cita a API usada como fonte dos dados, com o link recebido em `apiUrl` (vem de `config.apiUrl`, nunca fixo no código). Os integrantes ficam no array `integrantesDoGrupo`, em `footer.js`.
- O título do header **não** é `h1`: cada página tem o seu `h1` no `main`.

### Ordem das chamadas em cada página (implementado na T-11, 14/11/2026)

Os scripts não são módulos, então o `await` fica dentro de uma `async function iniciarPagina()`, chamada no fim do `script.js` (cada página carrega um só `script.js`, então o nome não conflita):

```js
async function iniciarPagina() {
    montarHeader('../../');                       // não dependem do config.json:
    montarNavbar('personagens', '../../');        // aparecem mesmo se ele falhar
    try {                                         // try/catch: ver 04-padroes-de-codigo.md, "Erro na tela"
        const config = await carregarConfig('../../');
        montarFooter(config.apiUrl);
        mostrarAviso('Carregando...', 'carregando');
        const itens = await buscarComCache(config.prefixoCache + 'personagens', config.apiUrl + '/characters');
        montarLista(itens, criarCardDoItem);      // criarCardDoItem: definida no script.js da página
    } catch (erro) {
        mostrarAviso('Não foi possível carregar os dados: ' + erro.message, 'erro');
    }
}
iniciarPagina();
```
- No `main` de cada página de recurso ficam o campo de busca (`label for="busca"` + `input type="search" id="busca"`) e os contêineres vazios `<div id="aviso"></div>` e `<div id="lista"></div>`, preenchidos pelos componentes Aviso e Card (T-16). Já estão em `pages/temporadas/` (T-26) e entram nas outras nas T-21 a T-24. **Use `src/pages/temporadas/` como modelo** (HTML e `script.js`).
- Assim o menu existe **uma vez só** (em `components/Navbar/navbar.js`), sem copiar e colar entre as páginas (RNF03).

## Página inicial (`index.html`)

- **Carrossel de imagens** (componente `carousel` do Bootstrap) no topo do `main`.
  - As imagens vêm da **API**, na rota `/carousel` (`image`, `description` como texto alternativo e `name` como legenda), lidas com `buscarComCache`. Não ficam fixas no HTML (decisão de 17/11/2026, T-18; ver [05-api-breaking-bad.md](05-api-breaking-bad.md#carrossel-apicarouselid)).
  - O JavaScript monta os slides com `createElement`/`appendChild`; o primeiro slide recebe a classe `active`.
  - Toda imagem precisa de `alt` (RNF02).
  - Controles anterior/próximo e indicadores, com texto para leitor de tela (`visually-hidden`).
  - **Implementado na T-19 (20/11/2026):** `<div id="aviso">` ("Carregando..." ou erro) e `<section id="carrossel" aria-label="Cenas marcantes da série">` abaixo do `h1`; autoplay de 5 s com pausa no hover; legenda com o nome da cena e o código do episódio. Detalhes em [04-padroes-de-codigo.md](04-padroes-de-codigo.md#carrossel-página-inicial-implementado-em-srccomponentscarrosselcarrosseljs-t-19-20112026).
- Abaixo do carrossel: texto curto sobre o site e atalhos (cards ou botões) para cada página de recurso.
- A página inicial **não** é obrigada a ter lista/busca, porque não é página de recurso.

## Página de recurso

Ordem dentro do `main`:

1. Título da página (`h1`/`h2`).
2. Campo de busca com `label` (RF06).
3. Aviso de carregamento enquanto busca os dados.
4. Lista resumida (RF04): cards ou `list-group` do Bootstrap, em grade responsiva.
5. Mensagem de "nenhum item encontrado" (RF07), escondida por padrão.
6. Um único modal do Bootstrap por página (RF05), preenchido a cada clique. O `mostrarDetalhes` cria o modal no fim do `<body>` na primeira chamada, então ele não precisa de contêiner no HTML (T-17).

## Estrutura de pastas de `src/` (RNF03), decidida em 14/11/2026 (T-10)

Organização **inspirada no React** (`components/` + `globals.css`) e no projeto anterior da disciplina (cada página na sua pasta, com `index.html` + `style.css`). Escolha do usuário.

```
src/
├── index.html  index.css  index.js     # página inicial (carrossel)
├── global.css                          # :root com as cores + base (vale para todas as páginas)
├── config.json                         # link da API + prefixo do cache (ver 03-configuracao.md)
├── components/                         # pedaços de tela reaproveitados: um .js + um .css cada
│   ├── Header/     header.js    header.css     # montarHeader(raiz)                 (T-11)
│   ├── Navbar/     navbar.js    navbar.css     # montarNavbar(paginaAtual, raiz)    (T-11)
│   ├── Footer/     footer.js    footer.css     # montarFooter(apiUrl)               (T-11)
│   ├── Card/       card.js      card.css       # criarCard, montarLista             (T-16, implementado)
│   ├── Aviso/      aviso.js     aviso.css      # mostrarAviso, esconderAviso        (T-16, implementado)
│   ├── Modal/      modal.js     modal.css      # mostrarDetalhes                    (T-17, implementado)
│   └── Carrossel/  carrossel.js carrossel.css  # montarCarrossel (só index.html)     (T-19, implementado)
├── services/                           # funções que não desenham nada
│   ├── config.js   # carregarConfig(raiz)          (T-12)
│   ├── api.js      # buscarTodos(url)              (T-13, implementado)
│   ├── cache.js    # buscarComCache(chave, url)    (T-14, implementado)
│   ├── busca.js    # filtrarPorNome(itens, termo)  (T-15, implementado)
│   └── datas.js    # formatarData(data)            (T-26, implementado)
├── pages/
│   ├── personagens/  index.html  style.css  script.js   (T-21)
│   ├── mortes/       ...                                (T-22)
│   ├── temporadas/   ...                                (T-26, implementado: modelo das outras)
│   ├── episodios/    ...                                (T-23)
│   └── frases/       ...                                (T-24)
```

- **Componentes em PascalCase** (como no React); os arquivos dentro deles em minúsculo.
- O `script.js` de cada página só diz **o que** mostrar (quais campos); os services e componentes fazem o **como**.
- Cada arquivo da T-10 começou só com o comentário da função prevista e o cartão do quadro. Cada cartão preenche o seu. **Já preenchidos:** Header, Navbar, Footer (T-11), `services/config.js` (T-12), `services/api.js` (T-13), `services/cache.js` (T-14), `services/busca.js` (T-15), Card e Aviso (T-16), Modal (T-17), Carrossel (T-19), e `services/datas.js` + `pages/temporadas/` (T-26, criados já completos).

### Ordem dos arquivos em cada página

- **CSS**, no `<head>`: Bootstrap 5.3.8 (CDN jsDelivr) → `global.css` → CSS dos componentes usados → `style.css` da página. Cada um pode sobrescrever o anterior.
- **JS**, no fim do `<body>`: `bootstrap.bundle.min.js` → `services/*.js` → `components/*.js` → `script.js` da página. Cada arquivo usa funções dos anteriores.
- `<html lang="pt-BR" data-bs-theme="dark">`: o modo escuro do Bootstrap 5.3. O `global.css` troca as variáveis `--bs-*` pela paleta do site.
- **Fontes** (escolha do usuário, 14/11/2026): **Oswald** nos títulos (`h1`–`h6`, em maiúsculas) e **Source Sans 3** no texto, ambas do Google Fonts. Entram por `@import` no topo do `global.css`, uma vez só, e não por `<link>` em cada HTML. Ficam nas variáveis `--bb-fonte-titulo` e `--bb-fonte-texto`, com fontes de reserva.
- Sem `import`/`export` (módulos não foram vistos em aula e exigem configuração extra): tudo entra por `<script>`, então **os nomes de função não podem se repetir** entre os arquivos.

### Regra dos caminhos (`raiz`)

O `fetch`, os links e as imagens resolvem o caminho a partir da **página aberta**, e não do arquivo `.js`. Por isso as funções que montam links ou leem arquivos recebem a raiz como parâmetro:

| Página | `raiz` | Exemplo |
|---|---|---|
| `src/index.html` | `''` | `carregarConfig('')`, `montarNavbar('inicio', '')` |
| `src/pages/<nome>/index.html` | `'../../'` | `carregarConfig('../../')`, `montarNavbar('personagens', '../../')` |

Os `<link>` e `<script>` do HTML também usam `../../` nas páginas de `pages/`.
