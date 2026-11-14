# Pesquisa: dados para a API própria de Breaking Bad

Pesquisa feita em 12/11/2026 para montar a **nossa própria API de Breaking Bad**. A modelagem da API está em [`../especificacao/05-api-breaking-bad.md`](../especificacao/05-api-breaking-bad.md).

## Por que criar uma API própria

| API | Situação em 12/11/2026 |
|---|---|
| `breakingbadapi.com` (projeto [timbiles/Breaking-Bad--API](https://github.com/timbiles/Breaking-Bad--API)) | **Fora do ar**: o domínio não resolve mais. `badapi-one.vercel.app` é só o frontend desse projeto. O repositório tem o código e as consultas SQL, mas **não tem os dados**: eles ficavam num PostgreSQL que saiu do ar |
| `breaking-bad-api-six.vercel.app` ([jessicagertig/breaking-bad-api](https://github.com/jessicagertig/breaking-bad-api)) | No ar, mas **sem CORS**: o navegador bloqueia o `fetch` feito do Live Server. O repositório não declara licença |
| TVmaze (`api.tvmaze.com`) | Funciona, mas é um site de catálogo e avaliação de séries (tem notas de usuários), a mesma categoria do IMDb vetado pelo professor |
| `api.breakingbadquotes.xyz` | Instável (HTTP 429) e só tem frases |

## Fontes de dados

| Fonte | O que usamos | Licença / crédito |
|---|---|---|
| [Breaking Bad Wiki (Fandom)](https://breakingbad.fandom.com) | **Personagens** (infobox de cada página), **mortes** ([List of Character Deaths](https://breakingbad.fandom.com/wiki/List_of_Character_Deaths)), temporadas em que cada personagem aparece (categorias `Season N Characters (Breaking Bad)`) e imagens | Texto em CC BY-SA: citar a Wiki no README da API |
| [jessicagertig/breaking-bad-api](https://github.com/jessicagertig/breaking-bad-api) (`data/*.json`) | **Episódios**: os 62 de Breaking Bad, completos (título, sinopse, roteiro, direção, data, imagem, personagens) | Sem licença declarada: citar a origem |
| Wikipedia (lista de episódios e personagens) | Conferência de datas, roteiristas e diretores | CC BY-SA |

A Wiki tem uma API MediaWiki pública (`https://breakingbad.fandom.com/api.php`), sem chave. Foi por ela que os dados foram coletados (ver `scripts/`).

## O que foi encontrado

### Personagens
- A Wiki tem **228 personagens** distribuídos nas categorias de temporada de Breaking Bad.
- Foram selecionados **60 candidatos**, por três critérios:
  - **11 principais**: elenco principal da série.
  - Recorrentes que aparecem em 3 ou mais temporadas.
  - Personagens importantes na trama: antagonistas e mortes marcantes.
- Os dados da jessicagertig tinham só 29 personagens. Faltavam **Gus Fring, Tuco, Hector, Gale, Jane, Todd e Lydia**, e entravam figurantes como "Jock", "Chad's Girlfriend" e "E.M.T.".
- Cada infobox traz: nome, nome completo, ator, apelidos, nascimento, status, causa da morte, ocupações, família, primeira e última aparição.

### Mortes
- A Wiki contabiliza **270 mortes** em Breaking Bad, em **64 linhas** de tabela:
  - **53 linhas individuais**;
  - **11 linhas em grupo**, como as 167 vítimas do voo Wayfarer 515 (2x13) e os 11 membros do cartel envenenados por Gus (4x10).
- Por temporada (linhas): T1: 2, T2: 10, T3: 13, T4: 14, T5A: 15, T5B: 10.
- Cada linha traz: vítima, imagem, causa (descrição), arma, responsável, últimas palavras e episódio.
- Os dados da jessicagertig tinham só **6 mortes** de Breaking Bad e pelo menos um erro: atribuíam a morte de Howard Hamlin a Walter White, quando foi Lalo Salamanca.

### Episódios e frases
- Episódios: os 62 da jessicagertig estão completos, e todos têm imagem, sinopse e lista de personagens.
- Frases: as **146 frases de Breaking Bad são todas da 1ª temporada**, então foram descartadas. No lugar, a API terá uma seleção própria de **frases marcantes bilíngues** (ver [`frases-marcantes.md`](frases-marcantes.md)).

### Imagens
- As imagens da Wiki (`static.wikia.nocookie.net`) só carregam quando o navegador envia o cabeçalho `Referer`. Sem ele, dão **403**.
- O Live Server envia esse cabeçalho, então elas funcionariam, mas isso é frágil. A recomendação é **baixar as imagens para dentro da API**.

## Limpeza necessária antes de virar API

Os JSON em `dados/` estão **brutos**. Antes de publicar, é preciso:

1. Padronizar as referências de episódio. Hoje vêm misturadas: título ("Pilot"), "1x1" e "Season 2". O alvo é `"1x01"`.
2. Separar **Leonel** e **Marco Salamanca**, que caem na mesma página ("The Cousins").
3. Usar o nome **"Saul Goodman"**, e não "Jimmy McGill", no contexto de Breaking Bad.
4. Normalizar o status para `Alive`, `Deceased` ou `Unknown`. O detalhe, como "Fled to Alaska…", pode ir para outro campo.
5. Remover sujeira de alguns campos (links do archive.org em datas, textos colados como "c. 1975Gale's age…").
6. Completar o que falta: aparições do Gonzo, nascimento de vários secundários, ator da Holly (vários bebês).
7. Ligar as mortes aos personagens (`character_id`) e aos episódios.
8. Corrigir títulos de episódio escritos errado nos dados da jessicagertig: "Live Free of Die" → **Live Free or Die** (5x01) e "To'hajilee" → **To'hajiilee** (5x13). Na Wiki, a página do 2x08 é "Better Call Saul (episode)".

## Arquivos desta pasta

| Arquivo | Conteúdo |
|---|---|
| `levantamento.md` | Tabelas geradas com os 60 personagens candidatos e as 64 linhas de mortes |
| `frases-marcantes.md` | Frases marcantes candidatas, em português e inglês |
| `dados/personagens_wiki.json` | Infobox bruto dos 60 candidatos (+ temporadas e imagem principal) |
| `dados/mortes_wiki.json` | As 64 linhas de mortes de Breaking Bad extraídas da Wiki |
| `dados/temporadas.json` | Os 228 personagens da Wiki e as temporadas em que cada um aparece |
| `scripts/temporadas.py` | Gera `temporadas.json` (categorias por temporada) |
| `scripts/personagens.py` | Gera `personagens_wiki.json` (infobox + imagem dos candidatos) |
| `scripts/parse_deaths.py` | Gera `mortes_wiki.json` a partir do wikitext de "List of Character Deaths" |

Os scripts são material de pesquisa (Python), e não código do site.
