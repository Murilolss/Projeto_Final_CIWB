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
        function () { mostrarDetalhes(item); });   // mostrarDetalhes: Modal (T-17)
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

### Modal de detalhes (RF05)

- Um `<div class="modal">` por página, com título e corpo vazios.
- Ao clicar em um item: limpar o corpo (`innerHTML = ''`), preencher com `createElement`, depois abrir com `bootstrap.Modal.getOrCreateInstance(elementoModal).show()` (ou com `data-bs-toggle="modal"` no item).

### Carrossel (página inicial)

- Estrutura do Bootstrap: `.carousel.slide` → `.carousel-inner` → um `.carousel-item` por imagem (o primeiro com `active`) → `<img class="d-block w-100" alt="...">` e, se houver, `.carousel-caption`.
- O JS lê as imagens do arquivo de configuração e cria os `.carousel-item`.

## Boas práticas combinadas

- Funções de API, cache e busca **só** em `src/services/`, e o que desenha na tela (header, navbar, footer, card, aviso, modal, carrossel) **só** em `src/components/` (RNF03). Onde fica cada função: [02-paginas-e-estrutura.md](02-paginas-e-estrutura.md#estrutura-de-pastas-de-src-rnf03-decidida-em-14112026-t-10).
- Sem `import`/`export`: tudo entra por `<script>`, então os nomes de função não podem se repetir entre arquivos.
- Funções que leem arquivos ou montam links recebem a `raiz` (`''` no `index.html`, `'../../'` em `pages/<nome>/`).
- Mostrar a mensagem "Carregando..." durante o `fetch` e uma mensagem de erro se a API falhar (`mostrarAviso`, com o `try/catch` de "Erro na tela").
- Usar `textContent` (e não `innerHTML`) para colocar na página os textos que vêm da API.
