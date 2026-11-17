# Arquivo de configuração

Pedido do usuário: centralizar em um único arquivo o **link da API** e as **imagens do carrossel**.

> **Mudança em 17/11/2026 (T-18):** a pedido do usuário, as imagens do carrossel saíram do `config.json` e foram para a API, na rota `/api/carousel`. O `config.json` guarda o link da API, e o carrossel vem de `config.apiUrl + '/carousel'`. Assim, o link continua sendo a única coisa que o site precisa saber (US02).

## O que o arquivo deve conter

| Chave | Exemplo | Uso |
|-------|---------|-----|
| URL base da API | `https://swapi.dev/api/` ou a da Hogwarts API | Montar as URLs de cada recurso |
| Prefixo das chaves de cache | `ciwb_` | Nomear os itens no localStorage (ex.: `ciwb_personagens`) |
| ~~Imagens do carrossel~~ | ~~lista de `{ src, alt, legenda }`~~ | Saiu em 17/11/2026: agora vem de `/api/carousel` (`image`, `description` = `alt`, `name` = legenda) |

Cada imagem precisa de `alt` (RNF02): na API, ele fica no campo `description`.

## Formato: `src/config.json` (decidido em 12/11/2026)

Arquivo: [`src/config.json`](../../src/config.json). Ficava em `src/js/config.json` e foi para a raiz de `src/` na T-10 (14/11/2026), quando a pasta `js/` deu lugar a `services/` e `components/` (ver [02-paginas-e-estrutura.md](02-paginas-e-estrutura.md#estrutura-de-pastas-de-src-rnf03-decidida-em-14112026-t-10)).

```json
{
    "apiUrl": "https://breaking-bad-api-ciwb.vercel.app/api",
    "prefixoCache": "ciwb_"
}
```

| Campo | Situação |
|-------|----------|
| `apiUrl` | **Preenchido** (14/11/2026): `https://breaking-bad-api-ciwb.vercel.app/api`, sem barra no final. As URLs dos recursos se montam com `` `${config.apiUrl}/characters` `` |
| `prefixoCache` | Definido (`ciwb_`) |
| ~~`carrossel`~~ | **Removido** (17/11/2026, T-18). As 10 imagens ficam na API (`/api/carousel`), e a pasta `src/img/` foi apagada. Ver [05-api-breaking-bad.md](05-api-breaking-bad.md#carrossel-apicarouselid) |

Como ler (padrão da aula 12), em `src/services/config.js`. **Implementado na T-12 (14/11/2026)** e usado por todas as páginas; o `montarFooter(config.apiUrl)` é o primeiro a usar o resultado:

```js
// raiz: '' no index.html e '../../' nas páginas de src/pages/<nome>/
async function carregarConfig(raiz) {
    const resposta = await fetch(raiz + 'config.json');
    if (!resposta.ok) {
        throw new Error('Erro ao carregar a configuração');
    }
    return await resposta.json();   // config.apiUrl, config.prefixoCache
}
```

O caminho do `fetch` é relativo ao **HTML** que roda o script, e não ao `config.js`. Como as páginas de recurso ficam duas pastas abaixo (`src/pages/<nome>/`), elas passam `'../../'` como raiz.

O carrossel (só no `index.html`) busca os slides com `buscarComCache(config.prefixoCache + 'carrossel', config.apiUrl + '/carousel')`. Os `image` já vêm como URL absoluta da API, então não dependem da `raiz`.

### Por que não `.env`

O usuário pediu um `.env`, mas o navegador não lê `.env` sozinho: esse arquivo é usado por Node.js e bundlers, que não fazem parte da disciplina. Além disso, alguns servidores estáticos (ex.: GitHub Pages) não publicam arquivos que começam com ponto. Também foram descartadas as opções `.env` + leitor em JS e `config.js`; o usuário escolheu `config.json`.

## Observações

- Não há segredos aqui (as duas APIs são públicas e sem chave), então o arquivo pode ir para o Git normalmente.
- Como o `config.json` é lido com `fetch`, o site precisa ser aberto por um servidor (ex.: Live Server do VS Code). Abrindo o HTML direto (`file://`), o `fetch` falha.
- O `fetch` é assíncrono: cada página precisa esperar (`await`) a configuração antes de chamar a API ou montar o carrossel.
- JSON não aceita comentários nem vírgula depois do último item.
