# Como criar a API REST de Breaking Bad

Passo a passo de como a **breaking-bad-api-ciwb** foi montada:

- Node.js com Express;
- dados em arquivos JSON;
- respostas no formato da SWAPI;
- roda em `localhost` e é publicada na Vercel.

O código fica no repositório separado `Arnaldo/API_BB`.

A API nasceu para o Projeto Prático de Interfaces Web (IFSP, 2026), que pede um site consumindo uma API dedicada a uma franquia, como a [SWAPI](https://swapi.dev). As APIs de Breaking Bad estavam fora do ar ou bloqueavam o navegador (sem CORS), então fizemos a nossa. O modelo segue o guia da [tvd-api](https://tvd-api.vercel.app/api), uma API de The Vampire Diaries feita para o mesmo projeto.

## Sumário

1. [Critérios que a API precisa cumprir](#1-critérios-que-a-api-precisa-cumprir)
2. [Fontes dos dados](#2-fontes-dos-dados)
3. [Pré-requisitos](#3-pré-requisitos)
4. [Criar a API e rodar em localhost](#4-criar-a-api-e-rodar-em-localhost)
5. [Testar](#5-testar)
6. [Publicar na Vercel](#6-publicar-na-vercel)
7. [Problemas comuns](#7-problemas-comuns)
8. [Referências](#8-referências)

---

## 1. Critérios que a API precisa cumprir

Os critérios vêm do enunciado do Projeto Prático e das APIs de Breaking Bad testadas antes de decidir criar uma própria (ver `contexto/pesquisa-api/README.md`). Uma API que falha em qualquer um deles atrapalha o site que vai consumi-la.

| Critério | Por quê | Como a breaking-bad-api-ciwb resolve |
|---|---|---|
| **Dedicada à franquia** | O professor pediu uma API "como as do enunciado" (SWAPI, Hogwarts API). Uma API geral de TV com notas de usuários, como a TVMaze, não vale | Só tem dados da série Breaking Bad (sem Better Call Saul e sem El Camino) |
| **CORS liberado** | O site roda no navegador, em outro domínio. Sem o cabeçalho `Access-Control-Allow-Origin`, o `fetch` é bloqueado. Foi o que eliminou a API da jessicagertig | Pacote `cors`, que responde `Access-Control-Allow-Origin: *` |
| **Formato da SWAPI** | O site pode ser escrito igual ao de quem usa a SWAPI | Listas com `count`, `next`, `previous` e `results` |
| **Paginação** | O site precisa buscar todas as páginas (RF03). Lista sem paginação pesa no `localStorage`, que guarda em torno de 5 MB | 10 itens por página, com `?page=N` |
| **Busca por nome** | Ajuda no filtro do site (RF06) | `?name=texto`, sem diferenciar maiúsculas nem acentos ("tomas" acha "Tomás Cantillo") |
| **Detalhe por id** | O modal do site mostra o item completo (RF05) | `GET /api/{recurso}/{id}` |
| **Relações como URL** | Igual à SWAPI: um personagem aponta para a URL da própria morte, que pode ser buscada depois | Campos `death`, `character`, `episode`, `season`, `seasons`, `episodes` e `characters` trazem URLs |
| **Erro em JSON** | O site sabe tratar "não encontrado" | `404` com `{ "detail": "..." }` |
| **Vários recursos** | Cada página do site é um tipo de conteúdo (RF02) | Personagens, mortes, episódios, temporadas e frases |
| **Sem chave de acesso** | Chave no JavaScript do navegador fica exposta | Nenhuma autenticação |
| **No ar e estável** | O site é apresentado ao vivo. A `breakingbadapi.com` saiu do ar quando o banco de dados dela foi desligado | Vercel, com deploy a cada push; os dados ficam no próprio repositório |

### Formato das respostas

Lista paginada (`GET /api/characters?page=2`):

```json
{
  "count": 61,
  "next": "https://breaking-bad-api-ciwb.vercel.app/api/characters?page=3",
  "previous": "https://breaking-bad-api-ciwb.vercel.app/api/characters?page=1",
  "results": [
    {
      "id": 11,
      "name": "Todd Alquist",
      "seasons": ["https://breaking-bad-api-ciwb.vercel.app/api/seasons/5"],
      "death": "https://breaking-bad-api-ciwb.vercel.app/api/deaths/61",
      "url": "https://breaking-bad-api-ciwb.vercel.app/api/characters/11"
    }
  ]
}
```

Raiz (`GET /api`), que lista os recursos:

```json
{
  "characters": "https://breaking-bad-api-ciwb.vercel.app/api/characters",
  "deaths": "https://breaking-bad-api-ciwb.vercel.app/api/deaths",
  "episodes": "https://breaking-bad-api-ciwb.vercel.app/api/episodes",
  "quotes": "https://breaking-bad-api-ciwb.vercel.app/api/quotes",
  "seasons": "https://breaking-bad-api-ciwb.vercel.app/api/seasons"
}
```

As URLs são montadas a partir do endereço de quem chamou: em `localhost` saem com `http://localhost:3000`, e na Vercel com o domínio público.

O esquema completo de cada recurso (campos, idioma, exemplos) está em [`05-api-breaking-bad.md`](05-api-breaking-bad.md).

---

## 2. Fontes dos dados

A API serve arquivos JSON que ficam no próprio repositório. Não há banco de dados.

| Fonte | O que forneceu | Licença |
|---|---|---|
| [Breaking Bad Wiki (Fandom)](https://breakingbad.fandom.com), pela API MediaWiki (`api.php`) | Infobox dos personagens, a tabela de 64 linhas de mortes (270 vítimas), as temporadas de cada personagem e as imagens | [CC BY-SA](https://creativecommons.org/licenses/by-sa/3.0/), exige crédito |
| [jessicagertig/breaking-bad-api](https://github.com/jessicagertig/breaking-bad-api) (`data/episodes.json`, branch `staging`) | Os 62 episódios: título, data, roteiro, direção, sinopse e personagens | O repositório não declara licença |
| Escrito à mão | Seleção dos 61 personagens, traduções para o português (ocupações, causas de morte, 62 sinopses, títulos), as 28 frases bilíngues e as últimas palavras | Tradução de texto CC BY-SA segue na mesma licença |

A coleta da Wiki foi feita com os scripts Python de `contexto/pesquisa-api/scripts/`, só na fase de pesquisa. A API em si usa apenas Node.

### Como os dados são organizados

```
data/
├── fontes/                     dados de origem, salvos exatamente como vieram (nunca editar)
│   ├── personagens_wiki.json
│   ├── mortes_wiki.json
│   ├── temporadas.json
│   └── episodes_jessicagertig.json
├── base/                       o que foi escrito à mão
│   ├── characters.json         seleção, nomes, apelidos, ocupações em pt
│   ├── deaths.json             causa, arma, responsáveis e últimas palavras em pt/en
│   ├── episodes.json           title_pt e sinopse em pt
│   ├── quotes.json             as 28 frases { pt, en }
│   └── correcoes.json          títulos errados da fonte e nomes nos episódios
├── characters.json  ┐
├── deaths.json      │
├── episodes.json    ├ gerados pelo script, a partir de fontes/ e base/
├── quotes.json      │
└── seasons.json     ┘
public/img/{characters,deaths,episodes}/   imagens servidas em /img/...
```

O script `scripts/montar-dados.js` junta as fontes e gera os arquivos finais (`npm run dados`). Ele também faz a limpeza:

- padroniza episódios ("1x1", "Pilot" → `1x01`);
- datas: `MM-DD-AAAA` → `AAAA-MM-DD`, e "c. March 1966" → "c. março de 1966";
- status: `Vivo`, `Morto` ou `Desconhecido`;
- separa Leonel e Marco, que estão na mesma página da Wiki;
- usa "Saul Goodman" no lugar de "Jimmy McGill";
- corrige "Live Free of Die" e "To'hajilee";
- liga mortes ↔ personagens ↔ episódios.

Se alguma ligação não fechar, o script para com erro. Guardar a fonte original separada permite refazer tudo se uma regra mudar, e mostra de onde veio cada informação.

### Cuidados com as fontes

- **Crédito.** Dado da Wiki (CC BY-SA) precisa de crédito no README da API.
- **Licença.** O repositório da jessicagertig não declara licença, então ele não autoriza cópia por padrão. Num trabalho acadêmico isso costuma passar, mas a origem fica citada.
- **Revisão.** Dado escrito à mão ou traduzido precisa de alguém que conheça a série para conferir. A lista final de personagens e as traduções ainda esperam essa revisão.
- **Baixar uma vez.** As fontes externas são baixadas e salvas em `data/fontes/`. A API publicada não depende delas estarem no ar.
- **Imagens.** A Wiki responde 403 a pedidos sem o cabeçalho `Referer` (proteção contra hotlink). Por isso as imagens ficam dentro da API, em `public/img/`:
  - foram baixadas uma vez com `npm run imagens` (187 imagens, 500 px de largura);
  - o endereço das imagens das mortes vem da API MediaWiki (`prop=imageinfo`).

---

## 3. Pré-requisitos

- [Node.js](https://nodejs.org) 20 ou mais novo. Conferir com `node --version`.
- [Git](https://git-scm.com) e uma conta no [GitHub](https://github.com).
- Conta na [Vercel](https://vercel.com) (plano Hobby, gratuito). Dá para entrar com a conta do GitHub.
- Um editor, como o VS Code.

---

## 4. Criar a API e rodar em localhost

### 4.1. Criar o projeto

```bash
cd API_BB
git init -b main
npm init -y
npm install express cors
```

No `package.json`, deixar os scripts assim:

```json
{
  "name": "breaking-bad-api-ciwb",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js",
    "test": "node --test",
    "dados": "node scripts/montar-dados.js",
    "imagens": "node scripts/baixar-imagens.js"
  },
  "engines": { "node": ">=20" }
}
```

Criar o `.gitignore`:

```
node_modules/
.vercel/
.env*
```

### 4.2. Colocar os dados

Cada recurso tem um JSON em `data/`. Cada item precisa de um `id` numérico único e de um campo `name`. Exemplo (trecho de `data/deaths.json`):

```json
[
  { "id": 11, "name": "Jane Margolis", "character": 26, "episode": 19, "episode_code": "2x12" }
]
```

As relações ficam guardadas como ids (`"character": 26`) e viram URLs na hora de responder.

### 4.3. Escrever o servidor

`src/index.js` é a versão do guia original estendida para os cinco recursos. A diferença está no objeto `recursos`: cada recurso declara **quais campos são relações e com que recurso**, e uma única função `formatar` transforma os ids em URLs.

```js
const path = require('path');
const express = require('express');
const cors = require('cors');

const characters = require('../data/characters.json');
const deaths = require('../data/deaths.json');
const episodes = require('../data/episodes.json');
const quotes = require('../data/quotes.json');
const seasons = require('../data/seasons.json');

const PAGE_SIZE = 10;

const app = express();
app.set('trust proxy', true); // na Vercel, faz req.protocol vir como https
app.use(cors());              // libera o acesso de qualquer site

// Em localhost serve as imagens. Na Vercel, a pasta public/ é servida pelo CDN.
app.use(express.static(path.join(__dirname, '..', 'public')));

const origem = (req) => `${req.protocol}://${req.get('host')}`;
const baseUrl = (req) => `${origem(req)}/api`;

// Busca sem diferenciar maiúsculas nem acentos ("tomas" acha "Tomás").
const normalizar = (texto) =>
  String(texto).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

const paraUrl = (base, recurso, valor) => {
  if (valor === null || valor === undefined) return null;
  if (Array.isArray(valor)) return valor.map((id) => `${base}/${recurso}/${id}`);
  return `${base}/${recurso}/${valor}`;
};

const recursos = {
  characters: { dados: characters, relacoes: { seasons: 'seasons', death: 'deaths' } },
  deaths: { dados: deaths, relacoes: { character: 'characters', episode: 'episodes', season: 'seasons' } },
  episodes: { dados: episodes, relacoes: { season: 'seasons', characters: 'characters' } },
  quotes: { dados: quotes, relacoes: { character: 'characters', episode: 'episodes' } },
  seasons: { dados: seasons, relacoes: { episodes: 'episodes' } },
};

const formatar = (nome, item, req) => {
  const base = baseUrl(req);
  const resposta = { ...item };
  for (const [campo, alvo] of Object.entries(recursos[nome].relacoes)) {
    if (campo in resposta) resposta[campo] = paraUrl(base, alvo, resposta[campo]);
  }
  if (resposta.image) resposta.image = `${origem(req)}/img/${resposta.image}`;
  resposta.url = `${base}/${nome}/${item.id}`;
  return resposta;
};

// Rotas: '/' e '/api' (raiz), '/api/:recurso' (lista paginada com ?page e ?name),
// '/api/:recurso/:id' (detalhe) e um 404 em JSON para o resto. Ver o arquivo completo.

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`API em http://localhost:${port}/api`));
}

module.exports = app;
```

As rotas são as mesmas do guia original, com dois ajustes:

- a busca usa `normalizar` (ignora acentos);
- os links `next`/`previous` mantêm o `?name=` quando há busca.

Duas linhas fazem a mesma API funcionar em `localhost` e na Vercel:

- `module.exports = app`: a Vercel importa o app e cuida do servidor.
- `if (require.main === module)`: o `app.listen` só roda quando o arquivo é executado direto com `node`, que é o caso do `npm start`.

Para acrescentar um recurso, basta outro JSON em `data/` e outra entrada em `recursos`.

### 4.4. Gerar os dados

```bash
npm run imagens   # baixa as imagens para public/img/ (ver seção 7)
npm run dados     # gera data/*.json a partir de fontes/ e base/
```

Depois de editar qualquer arquivo de `data/base/`, rode `npm run dados` de novo.

### 4.5. Rodar em localhost

```bash
npm start
```

Abrir no navegador:

- http://localhost:3000/api
- http://localhost:3000/api/characters
- http://localhost:3000/api/characters?page=7 (última página, `next: null`)
- http://localhost:3000/api/characters?name=saul
- http://localhost:3000/api/deaths?name=jane
- http://localhost:3000/api/seasons/5 (16 episódios: 5A + 5B)
- http://localhost:3000/api/quotes/21 ("Diga meu nome.")

Para parar o servidor: `Ctrl + C` no terminal. Para usar outra porta: `PORT=4000 npm start` no Git Bash, ou `$env:PORT=4000; npm start` no PowerShell.

---

## 5. Testar

O Node já traz um executor de testes (`node:test`), sem instalar nada. Os testes ficam em `test/api.test.js` e sobem a API numa porta livre:

```js
const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const app = require('../src/index.js');

let server;
let base;

before(async () => {
  server = app.listen(0); // porta livre qualquer
  await new Promise((r) => server.once('listening', r));
  base = `http://localhost:${server.address().port}/api`;
});

after(() => server.close());

test('CORS liberado', async () => {
  const res = await fetch(`${base}/characters`);
  assert.equal(res.headers.get('access-control-allow-origin'), '*');
});

test('busca por nome ignora maiúsculas e acentos', async () => {
  const body = await (await fetch(`${base}/characters?name=TOMAS`)).json();
  assert.deepEqual(body.results.map((c) => c.name), ['Tomás Cantillo']);
});
```

Rodar com `npm test`. Há **14 testes**, um para cada critério da [seção 1](#1-critérios-que-a-api-precisa-cumprir):

- CORS;
- a raiz com os 5 recursos;
- o formato SWAPI;
- o encadeamento `next`/`previous` até `null`;
- 404 para página inválida, id inexistente e recurso inexistente;
- busca com e sem acento, e filtro mantido na paginação;
- detalhe por id;
- `id`/`name`/`url` em todo item;
- relações como URLs que existem;
- temporada 5 com 16 episódios;
- textos bilíngues;
- imagens existentes.

---

## 6. Publicar na Vercel

A Vercel costuma reconhecer um projeto Express sem configuração extra:

- ela procura um arquivo de entrada que exporte o app (como `src/index.js`, `index.js`, `app.js` ou `server.js`) e transforma o app numa função;
- a pasta `public/` é servida direto pelo CDN; na Vercel, o `express.static` não é usado;
- em tese não precisa de `vercel.json`. Aqui, porém, o projeto criado pela CLI ficou com o preset *Other*, então a API tem um `vercel.json` com `{ "framework": "express" }` (ver [problemas comuns](#7-problemas-comuns)).

Os dois caminhos abaixo chegam ao mesmo resultado. A diferença é por onde o deploy é disparado. **Escolhido para esta API: GitHub + Vercel** (6.1), com a CLI já instalada e logada para os comandos de apoio.

| | Com a Vercel CLI | Sem a Vercel CLI |
|---|---|---|
| Onde se trabalha | Terminal | Site da Vercel + GitHub |
| O que publica | O comando `vercel` | Cada `git push` |
| Precisa do GitHub | Não | Sim |
| Bom para | Testar rápido, publicar sem repositório | Quem não quer instalar nada, deploy automático |

### 6.1. Pelo GitHub (deploy a cada push)

1. **Subir o código para o GitHub.** Com o `gh` (GitHub CLI) logado, na pasta `API_BB`:

   ```bash
   git add .gitignore package.json package-lock.json README.md src data public scripts test
   git commit -m "feat: primeira versão da API de Breaking Bad"
   gh repo create breaking-bad-api-ciwb --public --source . --push
   ```

   Sem o `gh`: criar um repositório vazio em https://github.com/new (sem README, para não conflitar), depois `git remote add origin https://github.com/SEU-USUARIO/breaking-bad-api-ciwb.git` e `git push -u origin main`.

2. **Importar na Vercel.** Em https://vercel.com/new, clicar em **Continue with GitHub** (ou **Import Git Repository**), autorizar a Vercel a ver o repositório e clicar em **Import** ao lado dele. Pela CLI, o mesmo passo é `vercel link` (nome `breaking-bad-api-ciwb`) seguido de `vercel git connect`.
3. **Conferir a configuração.** Em *Framework Preset*, a Vercel deve mostrar **Express**. Se aparecer *Other*, conferir se o arquivo de entrada exporta o app com `module.exports = app`. Os campos de build e output podem ficar em branco.
4. **Clicar em Deploy.** Em cerca de um minuto aparece a URL `https://breaking-bad-api-ciwb.vercel.app`. Testar `https://breaking-bad-api-ciwb.vercel.app/api`.
5. **Daí em diante, todo push publica sozinho.** Push na `main` gera deploy de produção. Push em outra branch gera um deploy de *preview*, com URL própria, sem mexer na produção.

### 6.2. Com a Vercel CLI

1. **Instalar e entrar** (já feito em 12/11/2026, CLI 65.15.0):

   ```bash
   npm install -g vercel
   vercel --version
   vercel login
   ```

   O `vercel login` mostra um link com um código. Basta abrir o link no navegador e autorizar a conta.

2. **Primeiro deploy (preview):** na pasta do projeto,

   ```bash
   vercel
   ```

   A CLI faz algumas perguntas. Respostas usuais:

   | Pergunta | Resposta |
   |---|---|
   | Set up and deploy? | `Y` |
   | Which scope? | a sua conta pessoal |
   | Link to existing project? | `N` |
   | Project name? | `breaking-bad-api-ciwb` |
   | In which directory is your code located? | `./` |
   | Want to modify these settings? | `N` |

   Ao final ela mostra uma URL de preview. A pasta `.vercel/`, criada nesse passo, liga a pasta local ao projeto na Vercel e fica fora do git (já está no `.gitignore`).

3. **Publicar em produção:**

   ```bash
   vercel --prod
   ```

   É esse comando que coloca a API no endereço `https://breaking-bad-api-ciwb.vercel.app`.

4. **(Opcional) Ligar ao GitHub** para ter deploy automático a cada push, igual ao caminho 6.1: `vercel git connect`, ou pelo painel: projeto → **Settings** → **Git** → **Connect Git Repository**.

5. **(Opcional) Rodar como na Vercel:** `vercel dev` sobe a API localmente simulando o ambiente da Vercel. Para o dia a dia, `npm start` basta.

### 6.3. Depois de publicar

- Conferir no navegador: `/api`, uma lista, uma busca, um detalhe e um id que não existe (404). As URLs das relações precisam começar com `https://`.
- Conferir o CORS chamando a API de outro site. No console do navegador (F12), em qualquer página:

  ```js
  fetch('https://breaking-bad-api-ciwb.vercel.app/api/characters').then((r) => r.json()).then(console.log)
  ```

- Colocar a URL pública no README da API e no `apiUrl` de `src/config.json` do site.

---

## 7. Problemas comuns

| Sintoma | Causa provável | O que fazer |
|---|---|---|
| Todas as rotas dão 404 (`NOT_FOUND`) e o deploy leva 2 segundos | O projeto foi criado pela CLI com o preset **Other**, e a Vercel publicou só a pasta `public/` como site estático | Criar `vercel.json` com `{ "framework": "express" }` e publicar de novo. Foi o que aconteceu com esta API |
| `vercel git connect` falha com "Failed to connect" | O app da Vercel não está instalado na conta do GitHub | Instalar em https://github.com/apps/vercel/installations/new, liberar o repositório e rodar `vercel git connect` de novo |
| Painel da Vercel mostra "No Production Deployment" depois do `vercel` | O comando sem `--prod` só cria preview | Rodar `vercel --prod`, ou fazer um push na `main` com o projeto ligado ao GitHub |
| URLs das relações saem com `http://` na Vercel | Falta `app.set('trust proxy', true)` | Acrescentar a linha antes das rotas |
| Erro de CORS no console do site | Falta `app.use(cors())` | Acrescentar a linha antes das rotas |
| `Cannot find module '../data/...'` | Caminho do `require` errado, ou `npm run dados` não foi rodado, ou arquivo fora do commit | Conferir o caminho relativo a `src/`, rodar `npm run dados` e conferir se `data/` foi commitado |
| `npm run dados` termina com "Dados com problema" | Alguma ligação não fechou (episódio, personagem ou morte desalinhada) | Ler a lista de problemas e corrigir em `data/base/` |
| `image` vem `null` | A imagem não está em `public/img/` | Colocar a imagem com o nome esperado (`characters/<slug>`, `deaths/<id com 2 dígitos>`, `episodes/<1x01>`) e rodar `npm run dados` |
| Imagens da Wiki dão 403 | A Wiki bloqueia acessos sem `Referer` (anti-hotlink), e `Special:FilePath` bloqueia scripts | Não usar links diretos da Wiki no site. Usar as cópias de `public/img/`. Para baixar de novo, `npm run imagens` (pula o que já existe) |
| `npm run imagens` dá 503 em algumas | Instabilidade passageira do servidor de imagens | Rodar de novo: só as que faltam são baixadas |
| `EADDRINUSE` ao rodar `npm start` | A porta 3000 já está em uso | Fechar o outro servidor ou usar outra porta (`PORT=4000`) |
| Deploy cai com "No entrypoint found" | O arquivo de entrada não exporta o app ou está num caminho não reconhecido | Garantir `module.exports = app` e o `"main"` do `package.json` apontando para ele |
| Mudei o JSON e a API não mudou | Arquivo gerado por script não foi regerado, ou não houve novo deploy | Rodar `npm run dados`, commitar e dar push (ou `vercel --prod`) |

---

## 8. Referências

- SWAPI, modelo do formato: https://swapi.dev/documentation
- tvd-api, modelo deste guia: https://github.com/alexsant22/tvd-api
- Express: https://expressjs.com
- Pacote `cors`: https://www.npmjs.com/package/cors
- Express na Vercel: https://vercel.com/docs/frameworks/backend/express
- Vercel CLI: https://vercel.com/docs/cli
- Deploy a partir do Git na Vercel: https://vercel.com/docs/git
- Executor de testes do Node: https://nodejs.org/api/test.html
- CORS, explicação da MDN: https://developer.mozilla.org/pt-BR/docs/Web/HTTP/CORS
- Breaking Bad Wiki: https://breakingbad.fandom.com
- jessicagertig/breaking-bad-api: https://github.com/jessicagertig/breaking-bad-api
