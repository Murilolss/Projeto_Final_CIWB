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

**Não vistos em aula** (evitar ou usar com cuidado): `Array.filter/map`, `join` (não está na aula 07: monte listas com `forEach` + `createElement`), `try/catch`, `import/export` (módulos), bundlers, `.env`. A configuração fica em `src/config.json`, lido com `fetch` por `carregarConfig(raiz)` em `src/services/config.js` (ver [03-configuracao.md](03-configuracao.md)). O Bootstrap só aparece no enunciado; use a documentação oficial (versão 5.3, via CDN).

## Padrão do professor para requisições

`async function` → `await fetch(url)` → `if (!resposta.ok)` trata o erro → `await resposta.json()` → monta o DOM.

Como os scripts não são módulos, o `await` não pode ficar solto no arquivo: cada `script.js` de página tem uma `async function iniciarPagina()` chamada no fim (ver a ordem das chamadas em [02-paginas-e-estrutura.md](02-paginas-e-estrutura.md#ordem-das-chamadas-em-cada-página-implementado-na-t-11-14112026)). Implementado em `src/services/config.js` (`carregarConfig`, T-12).

## Esboços (adaptar quando a API for definida)

### Buscar todas as páginas (RF03)

```js
// A forma de achar a "próxima página" depende da API (na SWAPI é o campo next).
async function buscarTodos(url) {
    const todos = [];
    while (url) {
        const resposta = await fetch(url);
        if (!resposta.ok) {
            throw new Error('Erro ao acessar a API');
        }
        const json = await resposta.json();
        json.results.forEach(function (item) {
            todos.push(item);
        });
        url = json.next;   // null na última página
    }
    return todos;
}
```

### Cache (RN01, RN02)

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

### Busca por nome (RF06, RF07)

```js
function filtrarPorNome(itens, termo) {
    const resultado = [];
    termo = termo.trim().toLowerCase();
    itens.forEach(function (item) {
        if (item.name.toLowerCase().includes(termo)) {
            resultado.push(item);
        }
    });
    return resultado;
}
// campoBusca.addEventListener('input', ...) → filtra → redesenha a lista
// se resultado.length === 0 → mostra a mensagem de "nenhum item encontrado"
```

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
- Mostrar a mensagem "Carregando..." durante o `fetch` e uma mensagem de erro se a API falhar.
- Usar `textContent` (e não `innerHTML`) para colocar na página os textos que vêm da API.
