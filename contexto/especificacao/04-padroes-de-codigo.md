# Padrões de código (baseados nas aulas)

Use o que foi ensinado. Antes de usar algo fora das aulas, confira `contexto/slides/` e prefira o equivalente visto em sala.

## Visto em aula: pode usar à vontade

| Assunto | Onde | Uso no projeto |
|---------|------|----------------|
| `fetch` + `async/await`, checar `resposta.ok`, `resposta.json()` | aula 12 | Acesso à API |
| `localStorage.setItem/getItem` + `JSON.stringify/parse`; `getItem` retorna `null` se não existir | aula 13 | Cache (RN01/RN02) |
| `createElement`, `appendChild`, `textContent`, `innerHTML = ''` | aulas 11 e 12 | Montar lista, modal e carrossel |
| `addEventListener('input' / 'click' / 'submit')` | aulas 10 e 14 | Busca e cliques |
| `for`, `forEach`, `push` | aulas 04 e 07 | Percorrer e juntar resultados |
| `toLowerCase()`, `includes()`, `trim()` | aula 06 | Comparar nomes na busca |
| Template string `` `${...}` `` | aula 12 | Montar URLs e textos |

**Não vistos em aula** (evitar ou usar com cuidado): `Array.filter/map`, `join` (não está na aula 07: monte listas com `forEach` + `createElement`), `try/catch` (usado **só** no `iniciarPagina()` de cada página, para mostrar o erro na tela: ver "Erro na tela"), `import/export` (módulos), bundlers, `.env`. A configuração fica em `src/config.json`, lido com `fetch` por `carregarConfig(raiz)` em `src/services/config.js` (ver [03-configuracao.md](03-configuracao.md)). O Bootstrap só aparece no enunciado; use a documentação oficial (versão 5.3, via CDN).

## Padrão do professor para requisições

`async function` → `await fetch(url)` → `if (!resposta.ok)` trata o erro → `await resposta.json()` → monta o DOM.

Como os scripts não são módulos, o `await` não pode ficar solto no arquivo: cada `script.js` de página tem uma `async function iniciarPagina()` chamada no fim (ver a ordem das chamadas em [02-paginas-e-estrutura.md](02-paginas-e-estrutura.md#ordem-das-chamadas-em-cada-página-implementado-na-t-11-14112026)). Implementado em `src/services/config.js` (`carregarConfig`, T-12).

## Esboços (adaptar quando a API for definida)

### Buscar todas as páginas (RF03): implementado em `src/services/api.js` (T-13, 14/11/2026)

```js
async function buscarTodos(url) {
    const todos = [];
    while (url) {                                   // while: aula 04
        const resposta = await fetch(url);
        if (!resposta.ok) {
            throw new Error('Erro ao acessar a API (' + resposta.status + ')');
        }
        const json = await resposta.json();         // { count, next, previous, results }
        json.results.forEach(function (item) {
            todos.push(item);
        });
        url = json.next;   // link completo da próxima página, ou null na última
    }
    return todos;
}
```

- Não precisa de limite de páginas: o laço só continua se a API mandar um `next`, e uma resposta de erro (404, 500) dispara o `throw`.
- O erro aparece na tela pelo componente Aviso (T-16), com o `try/catch` da página (ver "Erro na tela").

### Cache (RN01, RN02): implementado em `src/services/cache.js` (T-14, 15/11/2026)

```js
async function buscarComCache(chave, url) {
    const salvo = localStorage.getItem(chave);
    if (salvo !== null) {
        return JSON.parse(salvo);          // usa o cache, sem requisição
    }
    const dados = await buscarTodos(url);
    localStorage.setItem(chave, JSON.stringify(dados));
    return dados;
}
```

- A `chave` já vem com o prefixo: `config.prefixoCache + 'personagens'` → `ciwb_personagens`.
- Se a API falhar, o `throw` do `buscarTodos` interrompe a função antes do `setItem`: um erro nunca é salvo no cache, e a próxima visita tenta a API de novo.
- Sem expiração: o localStorage não expira (aula 13). Para testar com o cache vazio, DevTools → Application → Local Storage → Clear.
- **Chaves por recurso (fixadas na T-20, 20/11/2026).** Toda página que usa um recurso usa a **mesma** chave. Assim o cache que uma página salva serve para as outras. A página inicial carrega os 5 recursos, e quem passa por ela já deixa tudo salvo. As T-21 a T-24 **precisam** usar estes nomes:

  | Recurso | Rota | Chave | Quem usa |
  |---|---|---|---|
  | Carrossel | `/carousel` | `ciwb_carrossel` | início |
  | Personagens | `/characters` | `ciwb_personagens` | início, Personagens (T-21) |
  | Mortes | `/deaths` | `ciwb_mortes` | início, Personagens (T-21), Mortes (T-22) |
  | Temporadas | `/seasons` | `ciwb_temporadas` | início, Temporadas |
  | Episódios | `/episodes` | `ciwb_episodios` | início, Temporadas, Episódios (T-23) |
  | Frases | `/quotes` | `ciwb_frases` | início, Frases (T-24) |

### Busca por nome (RF06, RF07): implementado em `src/services/busca.js` (T-15, 15/11/2026)

```js
function filtrarPorNome(itens, termo) {
    const resultado = [];
    const procurado = termo.trim().toLowerCase();
    itens.forEach(function (item) {
        if (item.name.toLowerCase().includes(procurado)) {
            resultado.push(item);
        }
    });
    return resultado;
}

// Na página (T-21 a T-24): redesenha a lista a cada letra digitada
campoBusca.addEventListener('input', function () {
    montarLista(filtrarPorNome(itens, campoBusca.value), criarCardDoItem);
});
```

- Devolve um array novo e não altera `itens`. Um termo vazio devolve todos.
- Não mexe na tela: com o resultado vazio, o `montarLista` mostra "Nenhum item encontrado." (RF07).
- Não ignora acentos: "tomas" não acha "Tomás" (na API: Tomás Cantillo, "No Más", "Más" e "Abiquiú"). Ignorar acentos exigiria `normalize()`, que não foi visto em aula.

### Lista em cards (RF04): implementado em `src/components/Card/card.js` (T-16, 15/11/2026)

- `criarCard(titulo, linhas, imagem, aoClicar)`: devolve um `div.col` com o `.card` do Bootstrap. A imagem só aparece se não for `null` e tem `alt = titulo`. O título é um `h2.h5`, e há um `p` para cada texto de `linhas`. Com `aoClicar`, entra um botão "Ver detalhes" com `stretched-link`, que deixa o card inteiro clicável e funciona pelo teclado; nesse caso o card ganha a classe `card-clicavel`, com o efeito de hover.
- `montarLista(itens, criarCardDoItem)`: limpa `#lista`, coloca a grade (`row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4`) e um card por item. Com a lista vazia, mostra "Nenhum item encontrado." no Aviso; senão, esconde o Aviso.
- Imagem do card: `aspect-ratio: 4 / 3` com `object-fit: cover` e `object-position: center top`, o que serve para as fotos deitadas de mortes e episódios. As fotos dos personagens são em pé, e muitas mostram o rosto bem de perto. Por isso o `pages/personagens/style.css` troca o formato para `4 / 5`, e assim nem a testa nem o queixo são cortados. Leonel e Marco Salamanca usam a mesma foto: os dois primos sentados na cama, escolhida pelo usuário em 15/11/2026. Ela está em `public/img/characters/{leonel,marco}-salamanca.jpg` na API e mostra o rosto dos dois mesmo no formato em pé.
- Os campos de cada recurso ficam na página:

```js
function criarCardDoItem(item) {
    return criarCard(item.name, ['Ator: ' + item.portrayed_by, 'Status: ' + item.status], item.image,
        function () { abrirPersonagem(item); });   // abrirPersonagem: ver "Modal de detalhes"
}
```

### Avisos (carregando, erro, vazio): implementado em `src/components/Aviso/aviso.js` (T-16, 15/11/2026)

- `mostrarAviso(texto, tipo)`: troca o conteúdo de `#aviso` por um `.alert` do Bootstrap. `'carregando'` usa `alert-secondary` com spinner, `'erro'` usa `alert-danger` e `'vazio'` usa `alert-warning`. O erro tem `role="alert"` (o leitor de tela anuncia na hora), e os outros dois, `role="status"`. O texto entra por `textContent`.
- `esconderAviso()`: esvazia `#aviso`.

### Erro na tela: `try/catch` no `iniciarPagina()` (decisão do usuário, 15/11/2026)

`carregarConfig` e `buscarTodos` dão `throw` quando a resposta não é `ok`, e o próprio `fetch` falha ("Failed to fetch") com a API fora do ar ou sem internet. Sem tratamento, a página ficaria parada em "Carregando...". Por isso, cada página tem **um** `try/catch` no `iniciarPagina()`. É a única exceção à regra de usar só o visto em aula, e os services continuam iguais:

```js
async function iniciarPagina() {
    montarHeader('../../');
    montarNavbar('personagens', '../../');
    try {
        const config = await carregarConfig('../../');
        montarFooter(config.apiUrl);
        mostrarAviso('Carregando...', 'carregando');
        const itens = await buscarComCache(config.prefixoCache + 'personagens', config.apiUrl + '/characters');
        montarLista(itens, criarCardDoItem);       // esconde o "Carregando..."
        // busca: campoBusca.addEventListener('input', ...)
    } catch (erro) {
        mostrarAviso('Não foi possível carregar os dados: ' + erro.message, 'erro');
    }
}
```

- Em uma frase, para a apresentação: "o `try` tenta carregar; se algo der `throw` lá dentro, o JavaScript pula para o `catch`, que recebe o erro e mostra a mensagem na tela."

### Modal de detalhes (RF05): implementado em `src/components/Modal/modal.js` (T-17, 17/11/2026)

- `mostrarDetalhes(titulo, campos, imagem)`:
  - `campos` é um array de objetos `{ rotulo, valor }`;
  - o título entra por `textContent`; o corpo é limpo com `innerHTML = ''` e preenchido com `createElement`. Vem a imagem (se não for `null`, com `alt = titulo`) e depois uma `dl.row` com `dt.col-sm-4` e `dd.col-sm-8`: lado a lado no computador, um embaixo do outro no celular;
  - no fim, `bootstrap.Modal.getOrCreateInstance(modal).show()`.
- **Formatos de `valor`** (tratados no `adicionarCampo`):
  - texto ou número: aparece como está;
  - array: uma linha para cada item;
  - `null`, `''` ou array vazio: "Não informado", porque o RF05 pede todos os campos.
  - O array é reconhecido com `instanceof Array` (aula 02).
- **O HTML do modal não fica nos `index.html`.** Na primeira chamada, `criarModal()` monta o `#modal-detalhes` (`modal-lg`, `modal-dialog-centered`, `modal-dialog-scrollable`, `modal-fullscreen-sm-down`) no fim do `<body>`. Os cliques seguintes reaproveitam o mesmo modal, e assim as 4 páginas não repetem esse HTML (RNF03).
- **Acessibilidade:** `aria-labelledby` aponta para o título (`h2.h4`) e o X tem `aria-label="Fechar"`. Há também um botão "Fechar" no rodapé. O Bootstrap prende o foco no modal e fecha com Esc e com clique fora. Ele **não** devolve o foco quando o modal abre pelo JS (só faz isso com `data-bs-toggle`). Por isso, o `mostrarDetalhes` guarda o `document.activeElement` (o "Ver detalhes"), e o evento `hidden.bs.modal` devolve o foco a ele.
- **Imagem:** `object-fit: contain` com `max-height: 360px`, então a foto aparece inteira, sem corte.
- **Os campos de cada recurso ficam na página**, e a página converte as URLs e os objetos `{ pt, en }` em texto. Exemplo:

```js
function abrirPersonagem(item) {
    mostrarDetalhes(item.name, [
        { rotulo: 'Nome completo', valor: item.full_name },
        { rotulo: 'Ator', valor: item.portrayed_by },
        { rotulo: 'Status', valor: item.status },
        { rotulo: 'Ocupações', valor: item.occupations }   // array: uma linha por ocupação
    ], item.image);
}
```

### Datas (AAAA-MM-DD → DD/MM/AAAA): implementado em `src/services/datas.js` (T-26, 20/11/2026)

```js
function formatarData(data) {
    if (!data) {
        return null;                       // o Modal mostra "Não informado"
    }
    const partes = data.split('-');        // split: aula 06
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}
```

- **Não usar `new Date('2008-01-20')`:** o JavaScript lê esse formato como meia-noite em UTC, e no Brasil (UTC−3) isso ainda é o dia 19. A data sairia com um dia a menos. Como a API já manda o texto pronto, basta reorganizá-lo.
- Serve para `premiere_date`/`finale_date` (temporadas) e `air_date` (episódios). O `birth_date` dos personagens às vezes é aproximado ("c. 1958"). A T-21 trata isso no `formatarNascimento` da página de Personagens, que só chama o `formatarData` quando a data é exata.

### Página de recurso completa: `src/pages/temporadas/` (T-25/T-26, 20/11/2026)

Primeira página de recurso pronta. É o **modelo** para as T-21 a T-24: o `script.js` só diz quais campos mostrar.

- `let temporadas = []` e `let episodios = []` ficam fora do `iniciarPagina()`, para a busca e o modal enxergarem os dados depois do carregamento.
- `criarCardDaTemporada(temporada)`: `criarCard(name, ['16 episódios', 'De 15/07/2012 a 29/09/2013'], image, aoClicar)`.
- `abrirTemporada(temporada)`: `mostrarDetalhes` com Número, Quantidade de episódios, Estreia, Último episódio e **Episódios**. Esse último é um array com uma linha por episódio ("5x01 · Live Free or Die (Viver Livre ou Morrer) · 15/07/2012"), e o Modal já desenha um `li` para cada um.
- **Episódios dentro da temporada:** a temporada da API só traz os links dos episódios. Por isso a página também carrega `/episodes` com `buscarComCache(config.prefixoCache + 'episodios', ...)`, a **mesma chave** que a página de Episódios (T-23) vai usar. Quem abrir uma das duas já deixa o cache pronto para a outra. A função `episodiosDaTemporada` percorre os episódios com `forEach` e guarda os que têm `episodio.season === temporada.url`.
- Requisições: com o localStorage vazio, 1 a `/seasons` e 7 a `/episodes` (62 episódios, 10 por página). Com o cache cheio, nenhuma.
- Busca: `filtrarPorNome` sobre o `name` ("Temporada 3"), então digitar "3" acha a Temporada 3.

### Página de Personagens: `src/pages/personagens/` (T-21, 21/11/2026)

Segue o modelo de Temporadas.

- `let personagens = []` e `let mortes = []` ficam fora das funções.
- **Card** (`criarCardDoPersonagem`): `criarCard(name, ['Ator: Bryan Cranston', 'Status: Morto'], image, aoClicar)`. O cartão do quadro dizia "ocupação", mas o usuário escolheu ator e status em 21/11/2026, como já estava nesta especificação. A foto fica em 4:5 pelo `style.css` da página.
- **Modal** (`abrirPersonagem`): Nome completo, Apelidos (array), Ator, Nascimento, Status, Ocupações (array), Papel na série, Temporadas, Primeira aparição e Última aparição. O `status_detail` entra entre parênteses no Status, ex.: "Vivo (Fugiu do complexo de Jack Welker no final da série)". O `role` vira "Elenco principal" ou "Recorrente".
- **Morte no modal** (decisão do usuário, 21/11/2026): o personagem só traz o link `death`. Por isso a página também carrega `/deaths` com a chave `ciwb_mortes`, a mesma da página inicial e da página de Mortes (T-22). O `morteDoPersonagem` percorre as mortes com `forEach` e acha a que tem `morte.url === personagem.death`. Para quem tem `death`, o array de campos ganha, com `push`, o "Episódio da morte" (`episode_code`) e a "Causa da morte" (`cause`). Os 34 mortos têm `death`, e nenhum vivo tem. O Kenny aponta para a morte em grupo da gangue de Jack.
- **Funções auxiliares da página:**
  - `formatarNascimento(data)`: a expressão regular `/^\d{4}-\d{2}-\d{2}$/` com `.test` (aula 15) separa a data exata, que passa pelo `formatarData`. Datas aproximadas ("c. 1958", "década de 1950", "novembro (ano desconhecido)") aparecem como vieram, e `null` vira "Não informado";
  - `numerosDasTemporadas(personagem)`: `split('/')` em cada link de `seasons` e o último pedaço, concatenado em "1, 2, 3, 4, 5" (sem `join`).
- **Requisições:** com o localStorage vazio, 14 (7 `/characters` + 7 `/deaths`). Com o cache cheio, ou depois da página inicial, nenhuma.

### Carrossel (página inicial): implementado em `src/components/Carrossel/carrossel.js` (T-19, 20/11/2026)

- Estrutura do Bootstrap: `.carousel.slide` → `.carousel-inner` → um `.carousel-item` por imagem (o primeiro com `active`) → `<img class="d-block w-100" alt="...">` e, se houver, `.carousel-caption`.
- O `index.js` busca os slides com `buscarComCache(config.prefixoCache + 'carrossel', config.apiUrl + '/carousel')`, dentro do `try/catch` de "Erro na tela", com "Carregando..." no `#aviso`. O cache é consultado **antes** da API: com a chave `ciwb_carrossel` salva, a API não é chamada. Só os dados (com o link de cada foto) vão para o localStorage; os `.jpg` ficam no cache do navegador (decisão do usuário, 20/11/2026).
- `montarCarrossel(slides)` preenche `<section id="carrossel">`:
  - `div.carousel.slide.carousel-fade#carrossel-cenas`: o fade é a animação de destaque da página inicial, e vem do próprio Bootstrap;
  - um `for` com índice (aula 04) cria, para cada slide, o indicador (`criarIndicador`, com `aria-label="Cena N"` e `aria-current` no primeiro) e o item (`criarSlide`): `src = slide.image`, `alt = slide.description` (RNF02) e legenda com `h2.h4` = `slide.name` e "Episódio 5x07" = `slide.episode_code` (todos os 10 slides têm episódio desde 20/11/2026; o `if` só evita uma legenda vazia se a API mandar `null`);
  - `criarControle('prev' | 'next', texto)`: setas com `span.visually-hidden` "Anterior"/"Próximo".
- **Autoplay de 5 s** (escolha do usuário, 20/11/2026): `bootstrap.Carousel.getOrCreateInstance(carrossel, { interval: 5000, ride: 'carousel' })`. O `data-bs-ride` do HTML só liga carrosséis que já existem quando a página carrega, e este nasce depois do `fetch`. Pausa com o mouse em cima e troca com as setas do teclado (padrões do Bootstrap).
- São 10 slides, em uma página só da API (`next: null`).
- As imagens têm proporções diferentes: a maioria em 16:9, uma em 4:3 (superlaboratório) e uma em 3:2 (Felina). Por isso a `.carrossel-imagem` tem **altura fixa** (480px; 260px abaixo de 768px) com `object-fit: cover`, para os slides não mudarem de tamanho.
- A legenda ocupa a base inteira da foto, com um degradê escuro para ficar legível, e aparece também no celular.

### Página inicial: apresentação, atalhos, elenco e frase (T-20, 20/11/2026)

As funções ficam no `src/index.js`, porque só servem à página inicial. Os estilos ficam no `src/index.css`.

- **Sinopse e ficha técnica:** texto fixo no `index.html` (decisão do usuário). É conteúdo da página, e não dado de um recurso. A ficha é uma `dl.row` dentro de um `.card`.
- **Atalhos em ladrilhos (`montarAtalhos`):**
  - um `for` com índice percorre o `paginasDoMenu` (do `navbar.js`) a partir do 1, pulando o Início. O índice vira o "número atômico";
  - cada atalho é um `<a class="atalho">` com:
    - `criarLadrilho(i, pagina.simbolo)`, **reaproveitado do `header.js`**, com `aria-hidden="true"`;
    - o `h3` com o nome e o `p` com a `descricao`;
    - o `<p class="atalho-total" id="total-<id>">`, que começa vazio;
  - roda **antes** do `try`: com a API fora do ar, os atalhos continuam funcionando;
  - `simbolo` e `descricao` ficam no próprio `paginasDoMenu`. Uma página nova é um objeto só, e aparece no menu e nos atalhos.
- **Números da série nos ladrilhos:**
  - `mostrarTotal(id, texto)` escreve no `#total-<id>`;
  - os totais são o `.length` de cada array (61 personagens, 5 temporadas, 62 episódios, 28 frases);
  - as mortes mostram `somarVitimas(mortes)`, um `forEach` que soma `victims_count` (270 vítimas em 64 registros).
- **Elenco principal:**
  - `personagensPrincipais` usa `forEach` + `if (role === 'principal')` + `push` (11 personagens);
  - `criarCardDoElenco` chama `criarCard(name, ['Interpretado por ' + portrayed_by], image)`, **sem** `aoClicar`. Os detalhes ficam na página de Personagens, para onde aponta o link "Ver todos os personagens";
  - a lista é desenhada com `montarLista` em `<div id="lista">`;
  - o `index.css` troca a imagem para `aspect-ratio: 4 / 5` só em `#elenco .card-imagem`, como na página de Personagens. No 4:3 do `card.css`, os retratos ficavam com testa e queixo cortados (corrigido a pedido do usuário).
- **Frase em destaque:**
  - `frasesSemPalavrao` deixa de fora as 4 com `explicit: true` (sobram 24);
  - `sortearFrase` usa `Math.floor(Math.random() * frases.length)`, o mesmo padrão do dado em `codigo-exemplos/03.condicional_repeticao/exemplo2.js`, e um `while` sorteia de novo se cair na frase que já está na tela;
  - `mostrarFrase` preenche o PT, o EN (`lang="en"`), "Personagem · Episódio 5x07" e o `context`;
  - a `<section id="frase">` nasce com `hidden` e só aparece depois que as frases carregam. O `figure` tem `aria-live="polite"`;
  - o botão "Sortear outra frase" chama o `sortearFrase` no `click`.
- **Requisições:** com o localStorage vazio, 26 (1 carrossel + 7 personagens + 7 mortes + 1 temporadas + 7 episódios + 3 frases). Com o cache cheio, nenhuma. Depois do início, a página de Temporadas também não faz nenhuma.

## Boas práticas combinadas

- Funções de API, cache e busca **só** em `src/services/`, e o que desenha na tela (header, navbar, footer, card, aviso, modal, carrossel) **só** em `src/components/` (RNF03). Onde fica cada função: [02-paginas-e-estrutura.md](02-paginas-e-estrutura.md#estrutura-de-pastas-de-src-rnf03-decidida-em-14112026-t-10).
- Sem `import`/`export`: tudo entra por `<script>`, então os nomes de função não podem se repetir entre arquivos.
- Funções que leem arquivos ou montam links recebem a `raiz` (`''` no `index.html`, `'../../'` em `pages/<nome>/`).
- Mostrar a mensagem "Carregando..." durante o `fetch` e uma mensagem de erro se a API falhar (`mostrarAviso`, com o `try/catch` de "Erro na tela").
- Usar `textContent` (e não `innerHTML`) para colocar na página os textos que vêm da API.
