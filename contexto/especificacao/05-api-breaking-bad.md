# Modelagem da API de Breaking Bad

**Implementada** em 12/11/2026 no repositório `Arnaldo/API_BB`, seguindo o [guia de criação](guia-criar-api.md):

- Express + JSON, no formato SWAPI;
- 15 testes passando (eram 14; o do carrossel entrou em 17/11/2026);
- **publicada** na Vercel em 12/11/2026.

Esta página define **o que** a API entrega. O **como** está no guia e no README da API.

- Nome do projeto: `breaking-bad-api-ciwb`.
- URL: **https://breaking-bad-api-ciwb.vercel.app/api**.
- Código: https://github.com/Murilolss/breaking-bad-api-ciwb.

Pesquisa e dados brutos: [`../pesquisa-api/`](../pesquisa-api/README.md).

## Escopo

- **Só Breaking Bad**: sem Better Call Saul e sem El Camino (decisão do usuário).
- API própria, somente leitura (só `GET`), com JSON.
- Publicada com **HTTPS** e **CORS liberado** (`Access-Control-Allow-Origin: *`). Sem CORS, o `fetch` do site no Live Server é bloqueado, que foi justamente o problema da API da jessicagertig.

## Idioma (decidido em 12/11/2026)

- **Os valores são traduzidos para o português** (decisão do usuário): descrições, causas de morte, ocupações, sinopses, armas, status etc.
- **As frases marcantes ficam em português e inglês** (decisão do usuário), no formato:

  ```json
  { "pt": "Diga meu nome.", "en": "Say my name." }
  ```

  - Isso vale para o recurso de **frases** e para as **últimas palavras** das mortes.
  - Quando a fala original é em espanhol ou alemão, as últimas palavras ganham um terceiro campo, `original` (ex.: `"Gracias, jefe."`).
  - No site, o modal mostra a frase em português com o inglês logo abaixo.
- **Não se traduzem:**
  - nomes próprios (personagens, atores, lugares, empresas como Los Pollos Hermanos);
  - apelidos que são nomes, como "Heisenberg".
- **Títulos de episódio:** `name` guarda o título original (é como os episódios são conhecidos) e `title_pt` guarda a tradução.
- **As chaves continuam em inglês** (`name`, `status`…), como na SWAPI. Assim o código planejado em [`04-padroes-de-codigo.md`](04-padroes-de-codigo.md) (`item.name`) funciona sem mudanças (confirmado pelo usuário).
- As traduções são **próprias**, e não as da dublagem oficial.

## Recursos

| Recurso | Endpoint | Itens | Páginas | Página do site | Origem dos dados |
|---|---|---|---|---|---|
| Personagens | `/api/characters` | 61 | 7 | `personagens.html` | Breaking Bad Wiki |
| Mortes | `/api/deaths` | 64 registros (270 vítimas) | 7 | `mortes.html` | Breaking Bad Wiki |
| Episódios | `/api/episodes` | 62 | 7 | `episodios.html` | jessicagertig + Wiki |
| Temporadas | `/api/seasons` | 5 | 1 | `pages/temporadas/` (T-25/T-26) | Gerado dos episódios |
| Frases marcantes | `/api/quotes` | 28 | 3 | `frases.html` | Seleção própria, bilíngue, conferida na Wiki ([lista](../pesquisa-api/frases-marcantes.md)) |
| Carrossel | `/api/carousel` | 10 | 1 | `index.html` (carrossel) | 10 cenas marcantes escolhidas pelo usuário na Wiki (T-18, 17/11/2026) |

Cada recurso também tem a rota de item: `/api/<recurso>/<id>` (ex.: `/api/characters/1`).

Sobre os dados:

- Os 61 personagens são os 60 candidatos de `pesquisa-api/levantamento.md`, com "The Cousins" separados em Leonel e Marco.
- As 146 frases da jessicagertig foram **descartadas**, porque eram todas da 1ª temporada.

## Formato das respostas (compatível com a especificação do site)

As funções planejadas em [`04-padroes-de-codigo.md`](04-padroes-de-codigo.md) esperam o formato da SWAPI. Por isso a API segue o mesmo envelope:

```json
{
    "count": 61,
    "next": "https://breaking-bad-api-ciwb.vercel.app/api/characters?page=2",
    "previous": null,
    "results": [ { "id": 1, "name": "Walter White", "...": "..." } ]
}
```

- **10 itens por página.** Assim a API pagina de verdade, e o site precisa exercitar a RF03 ("obter todas as páginas") com o `buscarTodos(url)` que segue o `next`.
- `next` e `previous` são URLs completas, ou `null` na primeira e na última página.
- `?name=texto` busca sem diferenciar maiúsculas nem acentos, e os links de paginação mantêm o filtro.
- Página inválida, id inexistente e recurso inexistente respondem `404` com `{ "detail": "..." }`.
- **Todo item tem o campo `name`**, porque `filtrarPorNome(itens, termo)` usa `item.name` em todas as páginas. O significado muda por recurso:
  - episódios: o título original;
  - mortes: a vítima ou o grupo;
  - frases: o personagem que fala;
  - temporadas: "Temporada N".
- Todo item tem `id` (número) e `url` (o endereço do próprio item).
- **Relações são URLs**, como na SWAPI (critério do guia). O texto legível fica junto (ex.: `episode_code: "2x12"`), para o modal não precisar de requisições extras.
- `image` é uma URL absoluta (`https://<api>/img/...`) ou `null` enquanto a imagem não existir.

## Esquemas

### Personagem (`/api/characters/:id`)

```json
{
    "id": 1,
    "name": "Walter White",
    "full_name": "Walter Hartwell White",
    "nicknames": ["Heisenberg", "Walt", "Sr. White"],
    "portrayed_by": "Bryan Cranston",
    "birth_date": "1958-09-07",
    "status": "Morto",
    "status_detail": null,
    "occupations": ["Professor de química do ensino médio", "Cofundador da Gray Matter Technologies", "Fabricante de metanfetamina", "Coproprietário do lava-rápido A1A"],
    "role": "principal",
    "seasons": ["https://<api>/api/seasons/1", "...", "https://<api>/api/seasons/5"],
    "first_appearance": "1x01",
    "last_appearance": "5x16",
    "death": "https://<api>/api/deaths/64",
    "image": "https://<api>/img/characters/walter-white.webp",
    "url": "https://<api>/api/characters/1"
}
```

| Campo | Tipo | Observação |
|---|---|---|
| `full_name` | texto ou `null` | Quando a Wiki deixa o campo vazio e o `name` já tem nome e sobrenome, repete o `name` (ex.: "Jane Margolis"). Gonzo e No-Doze usam o nome real que a Wiki dá ("Álvaro González", "Normando dos Santos"). Fica `null` só para os 9 conhecidos por apelido ou primeiro nome (Skinny Pete, Tortuga, Victor, Kenny, Declan, Lawson, Old Joe, Clovis, Spooge). Corrigido em 21/11/2026: antes, 37 eram `null` |
| `birth_date` | texto ou `null` | `AAAA-MM-DD` quando a data é exata. Senão, o texto aproximado traduzido (`"c. 1958"`, `"c. março de 1966"`, `"década de 1950"`) |
| `status` | texto | `Vivo`, `Morto` ou `Desconhecido` |
| `status_detail` | texto ou `null` | Detalhe do status, ex.: Ted, "Ficou com sequelas depois de um acidente em casa" |
| `role` | texto | `principal` (elenco principal) ou `recorrente` |
| `seasons` | URLs | A T5 da Wiki (5A e 5B) vira a temporada 5 |
| `death` | URL ou `null` | A morte do personagem, quando ele morre na série. Kenny aponta para a morte em grupo da gangue |

**Lista no site (RF04):** `name`, `portrayed_by` e `status` (+ imagem). **Modal (RF05):** todos os campos.

### Morte (`/api/deaths/:id`)

```json
{
    "id": 11,
    "name": "Jane Margolis",
    "victims_count": 1,
    "character": "https://<api>/api/characters/26",
    "cause": "Engasgou com o próprio vômito durante uma overdose de heroína. Walter White deixou que ela morresse...",
    "weapon": "Overdose de heroína",
    "responsible": ["Ela mesma", "Walter White (deixou que ela morresse)"],
    "last_words": {
        "pt": "Eu acho que a gente joga fora o que sobrou e começa hoje à noite.",
        "en": "I say we flush what we've got left and we start tonight."
    },
    "season": "https://<api>/api/seasons/2",
    "episode": "https://<api>/api/episodes/19",
    "episode_code": "2x12",
    "image": "https://<api>/img/deaths/11.png",
    "url": "https://<api>/api/deaths/11"
}
```

| Campo | Observação |
|---|---|
| `victims_count` | `1` nas mortes individuais. Nos grupos, é o total de vítimas, calculado do intervalo da Wiki (ex.: Wayfarer 515: 167), e `name` descreve o grupo |
| `character` | `null` quando a vítima não está entre os personagens da API (figurantes, grupos) |
| `last_words` | `{ pt, en }`, opcionalmente com `original`. `null` quando a Wiki registra "Unknown" ou quando o personagem não fala (Hector) |

**Lista:** `name`, `episode_code` e `responsible`. **Modal:** todos os campos.

### Episódio (`/api/episodes/:id`)

```json
{
    "id": 1,
    "name": "Pilot",
    "title_pt": "Piloto",
    "season": "https://<api>/api/seasons/1",
    "number": 1,
    "code": "1x01",
    "air_date": "2008-01-20",
    "written_by": "Vince Gilligan",
    "directed_by": "Vince Gilligan",
    "synopsis": "Walter White, um pacato professor de química do ensino médio, descobre que tem câncer de pulmão...",
    "characters": ["https://<api>/api/characters/1", "https://<api>/api/characters/3", "..."],
    "characters_names": ["Walter White", "Jesse Pinkman", "...", "Krazy-8"],
    "image": "https://<api>/img/episodes/1x01.jpg",
    "url": "https://<api>/api/episodes/1"
}
```

- As datas da jessicagertig vêm como `MM-DD-AAAA`. Na API ficam em `AAAA-MM-DD`, para o site poder usar `new Date()` (aula 09).
- `characters` traz só os personagens que estão na API.
- `characters_names` traz todos os nomes do episódio, inclusive figurantes, com os erros de digitação da fonte corrigidos.

**Lista:** `name` (+ `title_pt`), `code` e `air_date`. **Modal:** todos os campos.

### Temporada (`/api/seasons/:id`)

```json
{
    "id": 5,
    "name": "Temporada 5",
    "number": 5,
    "episodes_count": 16,
    "premiere_date": "2012-07-15",
    "finale_date": "2013-09-29",
    "episodes": ["https://<api>/api/episodes/47", "..."],
    "image": "https://<api>/img/episodes/5x01.jpg",
    "url": "https://<api>/api/seasons/5"
}
```

Gerada a partir dos episódios. A temporada 5 junta as partes 5A e 5B (16 episódios). A imagem é a do primeiro episódio.

**Lista:** `name`, `episodes_count` e o período (`premiere_date` a `finale_date`). **Modal:** todos os campos e a lista de todos os episódios (código, título original, `title_pt` e data). Como `episodes` só tem links, o site cruza com `/api/episodes` pelo `episode.season` (ver [04-padroes-de-codigo.md](04-padroes-de-codigo.md)).

### Frase marcante (`/api/quotes/:id`)

```json
{
    "id": 21,
    "name": "Walter White",
    "character": "https://<api>/api/characters/1",
    "quote": { "pt": "Diga meu nome.", "en": "Say my name." },
    "context": "Walter exigindo que Declan o reconheça",
    "episode": "https://<api>/api/episodes/53",
    "episode_code": "5x07",
    "explicit": false,
    "url": "https://<api>/api/quotes/21"
}
```

- `name` é quem fala, então a busca filtra por personagem.
- `explicit: true` marca as 4 frases com palavrão.
- **Lista:** a frase em português e o personagem. **Modal:** a frase nos dois idiomas, o contexto e o episódio.

### Carrossel (`/api/carousel/:id`)

```json
{
    "id": 7,
    "name": "Diga meu nome",
    "description": "Walter White, de óculos e cavanhaque, encara a câmera de perto",
    "season": "https://<api>/api/seasons/5",
    "episode": "https://<api>/api/episodes/53",
    "episode_code": "5x07",
    "image": "https://<api>/img/carousel/07.jpg",
    "url": "https://<api>/api/carousel/7"
}
```

- 10 cenas marcantes, **em ordem cronológica** (o `id` segue a ordem): 1x01, 1x06, 2x10, 3x06, 4x11, 4x13, 5x07, 5x08, 5x14 e 5x16.
- `name` é a legenda do slide, e `description` é o texto alternativo da imagem (RNF02).
- O slide 4 (superlaboratório) é do **3x06 "Pôr do Sol"** (informado pelo usuário em 20/11/2026). Antes ele tinha `episode` e `episode_code` `null`, porque a Wiki marca a foto como "unknown episode". O código da API ainda aceita `null` para uma cena futura sem episódio.
- Escrito à mão em `data/base/carousel.json`; o `npm run dados` gera `data/carousel.json` e confere temporada, episódio, descrição e imagem.
- Imagens em `public/img/carousel/01.jpg` a `10.jpg`: JPEG com no máximo 1280 px de largura, de 67 a 209 KB cada.
- Escolha do usuário: as fotos 1, 2 e 6 foram trocadas na revisão. A 1 antiga era do flashback do 5x14, a 2 tinha qualidade baixa e a 6 mostrava o rosto destruído do Gus.

## Ligações entre recursos

- `character.death` → `deaths/:id`, e `death.character` → `characters/:id` (ida e volta).
- `quote.character` → `characters/:id`.
- `carousel.season` → `seasons/:id`, e `carousel.episode` → `episodes/:id` (ou `null`).
- `death.episode`, `quote.episode` → `episodes/:id`. O código fica em `episode_code`.
- `death.season`, `episode.season` e `character.seasons` → `seasons/:id`.
- `season.episodes` → `episodes/:id`, e `episode.characters` → `characters/:id`.
- `character.first_appearance` / `last_appearance` são códigos (`"1x01"`), iguais a `episode.code`.

## Imagens

- Ficam dentro da API, em `public/img/{characters,deaths,episodes,carousel}/`, servidas em `/img/...` pelo CDN da Vercel.
  - Nomes: `characters/<slug-do-nome>`, `deaths/<id com 2 dígitos>`, `episodes/<1x01>`, `carousel/<id com 2 dígitos>`.
  - Depois de colocar uma imagem, rode `npm run dados`.
- **Baixadas em 12/11/2026** (187 imagens, 7,6 MB, com 500 px de largura) com `npm run imagens`, rodado a pedido do usuário. A Wiki bloqueia o acesso sem `Referer` (403), por isso o script envia esse cabeçalho.
  - Personagens e episódios: o script usa os links da fonte.
  - Mortes: o endereço vem da API MediaWiki (`api.php`, `prop=imageinfo`), porque `Special:FilePath` dá 403 para scripts.
- Citar a Breaking Bad Wiki (CC BY-SA) no README da API (feito).
- O carrossel da página inicial tem as **próprias 10 imagens** (`public/img/carousel/`), em tamanho maior (até 1280 px). Elas foram baixadas à mão em 17/11/2026, com `Referer` + `?format=original`, e convertidas para JPEG com o .NET do PowerShell.

## Decisões

| Decisão | Situação |
|---|---|
| Escopo: só Breaking Bad | **Decidido** (usuário) |
| Idioma: valores em português, frases marcantes bilíngues `{ pt, en }` | **Decidido** (usuário) |
| Chaves em inglês | **Decidido** (usuário) |
| Títulos de episódio: original em `name` + tradução em `title_pt` | **Decidido** (usuário) |
| Frases: as mais marcantes da série, no lugar das 146 da T1 | **Decidido** (usuário): [28 frases conferidas](../pesquisa-api/frases-marcantes.md) |
| Incluir as 4 frases com palavrão (17, 22, 23, 26) | **Decidido** (usuário): entram, ficam as 28 frases, marcadas com `explicit: true` |
| Onde publicar a API | **Decidido** (usuário, 12/11/2026): **Vercel**, com deploy por **GitHub** (cada push publica). CLI 65.15.0 logada |
| Nome do projeto | **Decidido** (usuário): `breaking-bad-api-ciwb` |
| Onde fica o código da API | **Decidido** (usuário, 12/11/2026): repositório separado `Arnaldo/API_BB` (branch `main`) |
| Como implementar a API | **Decidido** (usuário, 12/11/2026): Node + Express + JSON, conforme o [guia](guia-criar-api.md) |
| Recurso de temporadas | **Decidido** (usuário): entra, fica com 5 recursos (6 com o carrossel, de 17/11/2026) |
| Recurso de carrossel | **Decidido** (usuário, 17/11/2026): rota `/api/carousel` com as 10 imagens da página inicial; o site lê dela, e não do `config.json` |
| Relações como URL (SWAPI) | **Decidido** (Claude, critério do guia): ids viram URLs, com o texto legível ao lado (`episode_code`) |
| Lista final de personagens (61) e traduções | **Pendente**: revisar com o usuário |
| Origem das imagens | **Feito** (usuário pediu para rodar `npm run imagens`): 187 imagens da Wiki em `public/img/` |
