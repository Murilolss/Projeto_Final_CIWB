# Especificação do site — índice

Documentação de consulta durante o desenvolvimento. Reúne o enunciado (`contexto/slides/00-projeto-pratico-2026.md`), os pedidos do usuário e os padrões das aulas.

| Página | Conteúdo |
|--------|----------|
| [01-requisitos.md](01-requisitos.md) | Checklist de todos os requisitos (enunciado + pedidos do usuário) |
| [02-paginas-e-estrutura.md](02-paginas-e-estrutura.md) | Mapa de páginas, layout comum, página inicial com carrossel, pastas de `src/` |
| [03-configuracao.md](03-configuracao.md) | Arquivo de configuração: link da API e prefixo do cache (as imagens do carrossel vêm da API) |
| [04-padroes-de-codigo.md](04-padroes-de-codigo.md) | Como implementar cada parte usando o que foi ensinado em aula |
| [05-api-breaking-bad.md](05-api-breaking-bad.md) | Modelagem da API própria de Breaking Bad (recursos, formato, esquemas) |
| [guia-criar-api.md](guia-criar-api.md) | Guia de como a API foi criada e publicada (Express, testes, Vercel), adaptado do guia da tvd-api |

## Decisões em aberto

| Decisão | Situação |
|---------|----------|
| API / franquia | **Decidido** (12/11/2026): **API própria de Breaking Bad**, só da série Breaking Bad. O professor permite outra API, desde que não seja de site de avaliação (IMDb etc.). Pesquisa em [`../pesquisa-api/`](../pesquisa-api/README.md) |
| Modelagem da API | **Implementada** (12/11/2026) em `../API_BB`, conforme [05-api-breaking-bad.md](05-api-breaking-bad.md) e o [guia](guia-criar-api.md). 6 recursos (o carrossel entrou em 17/11/2026), 197 imagens, 15 testes passando. **Publicada**: https://breaking-bad-api-ciwb.vercel.app/api (código em https://github.com/Murilolss/breaking-bad-api-ciwb) |
| Repositório e hospedagem da API | **Decidido** (12/11/2026): repositório separado `../API_BB` (fora deste projeto), publicado na **Vercel** |
| Formato do arquivo de configuração | **Decidido** — `src/config.json` (12/11/2026; saiu de `src/js/` na T-10, em 14/11/2026); ver [03-configuracao.md](03-configuracao.md) |
| Link da API no `config.json` (`apiUrl`) | **Preenchido** (14/11/2026): `https://breaking-bad-api-ciwb.vercel.app/api` |
| Imagens do carrossel | **Decidido** (17/11/2026, T-18): 10 cenas marcantes em ordem cronológica, escolhidas pelo usuário na Breaking Bad Wiki. Ficam na API, na rota `/api/carousel` (pedido do usuário), e não mais no `config.json`. Ver [05-api-breaking-bad.md](05-api-breaking-bad.md#carrossel-apicarouselid) |
| Recursos (páginas) do site | **Proposto**: personagens, mortes, episódios e frases marcantes (ver [05-api-breaking-bad.md](05-api-breaking-bad.md)) |
| Idioma dos dados da API | **Decidido** (12/11/2026): valores em português; frases marcantes e últimas palavras em português e inglês `{ pt, en }` |

## Prazo

Apresentação e entrega: **08/12/2026**.
