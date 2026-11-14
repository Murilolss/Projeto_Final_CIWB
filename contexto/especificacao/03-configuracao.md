# Arquivo de configuração

Pedido do usuário: centralizar em um único arquivo o **link da API** e as **imagens do carrossel**.

## O que o arquivo deve conter

| Chave | Exemplo | Uso |
|-------|---------|-----|
| URL base da API | `https://swapi.dev/api/` ou a da Hogwarts API | Montar as URLs de cada recurso |
| Prefixo das chaves de cache | `ciwb_` | Nomear os itens no localStorage (ex.: `ciwb_personagens`) |
| Imagens do carrossel | lista de `{ src, alt, legenda }` | Montar o carrossel da página inicial |

Cada imagem precisa de `alt` (RNF02); a legenda é opcional.

## Formato: `src/js/config.json` (decidido em 12/11/2026)

Arquivo: [`src/js/config.json`](../../src/js/config.json)

```json
{
    "apiUrl": "",
    "prefixoCache": "ciwb_",
    "carrossel": [
        { "src": "img/carrossel-1.jpg", "alt": "...", "legenda": "" }
    ]
}
```

| Campo | Situação |
|-------|----------|
| `apiUrl` | **Vazio**: preencher quando a API for escolhida |
| `prefixoCache` | Definido (`ciwb_`) |
| `carrossel` | **3 entradas provisórias**: trocar `src` e `alt` (marcados com `PREENCHER`) pelas imagens reais. Imagens locais vão em `src/img/`; também pode ser uma URL externa |

Como ler (padrão da aula 12):

```js
async function carregarConfig() {
    const resposta = await fetch('js/config.json');
    if (!resposta.ok) {
        throw new Error('Erro ao carregar a configuração');
    }
    return await resposta.json();   // config.apiUrl, config.carrossel...
}
```

O caminho `'js/config.json'` é relativo ao HTML que roda o script (as páginas ficam na raiz de `src/`).

### Por que não `.env`

O usuário pediu um `.env`, mas o navegador não lê `.env` sozinho: esse arquivo é usado por Node.js e bundlers, que não fazem parte da disciplina. Além disso, alguns servidores estáticos (ex.: GitHub Pages) não publicam arquivos que começam com ponto. Também foram descartadas as opções `.env` + leitor em JS e `config.js`; o usuário escolheu `config.json`.

## Observações

- Não há segredos aqui (as duas APIs são públicas e sem chave), então o arquivo pode ir para o Git normalmente.
- Como o `config.json` é lido com `fetch`, o site precisa ser aberto por um servidor (ex.: Live Server do VS Code). Abrindo o HTML direto (`file://`), o `fetch` falha.
- O `fetch` é assíncrono: cada página precisa esperar (`await`) a configuração antes de chamar a API ou montar o carrossel.
- JSON não aceita comentários nem vírgula depois do último item.
