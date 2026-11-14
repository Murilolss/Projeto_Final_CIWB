# Aula 13 — Cookies e Local Storage

> Fonte: `contexto/pdfs/13.Cookies e localStorage.pdf` — Prof. José Arnaldo Mascagni de Holanda (IFSP Araraquara)

## Motivação

- O HTTP é *stateless*: cada requisição é independente da anterior.
- Sem "lembrar" o usuário, seria preciso fazer login a cada página, e carrinhos seriam esvaziados a cada clique.
- **Solução:** armazenar pequenas quantidades de dados no navegador para manter estado, preferências e informações entre sessões.
- Tecnologias: **Cookies** e **Web Storage API** (`localStorage` e `sessionStorage`).

## Cookies

Pequenos arquivos de texto que o site envia ao navegador; o navegador os anexa a cada requisição futura ao mesmo site.

- **Tamanho limitado**: geralmente até 4 KB.
- **Enviados a cada requisição**: aumentam o tamanho das requisições HTTP.
- **Data de expiração**: se não definida, são apagados ao fechar o navegador ("cookie de sessão").
- **Sintaxe complexa**: `document.cookie` é uma única string, o que torna a manipulação verbosa.

### Criando

`document.cookie` é uma string com todos os cookies, separados por `;`. Para criar/atualizar, atribui-se uma nova string.

```js
// Cookie que expira em 7 dias
const dataExpiracao = new Date();
dataExpiracao.setDate(dataExpiracao.getDate() + 7);

document.cookie = `username=alunoADS; expires=${dataExpiracao.toUTCString()}; path=/`;

// Cookie de sessão (deletado ao fechar o navegador)
document.cookie = "tema=dark; path=/";
```

### Lendo

É preciso "parsear" a string:

```js
function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
```

### Deletando

Defina a data de expiração no passado:

```js
document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
```

## Local Storage

Parte da Web Storage API; forma mais simples e robusta que cookies.

- **Tamanho maior**: geralmente 5 MB a 10 MB por domínio.
- **Não é enviado ao servidor**: fica só no navegador.
- **Persistência**: os dados **não expiram**; ficam até serem removidos via JavaScript.
- **API simples**: `setItem`, `getItem`, `removeItem`, `clear`.
- **Armazena apenas strings**: para objetos/arrays use `JSON.stringify()` ao salvar e `JSON.parse()` ao ler.

### Salvando / atualizando — setItem(chave, valor)

```js
localStorage.setItem('nomeUsuario', 'Maria Silva');
localStorage.setItem('curso', 'Análise e Desenvolvimento de Sistemas');

// Salvando um objeto (precisa converter para string)
const preferencias = { tema: 'dark', fonte: '14px' };
localStorage.setItem('preferenciasUsuario', JSON.stringify(preferencias));
```

### Lendo — getItem(chave)

```js
const usuario = localStorage.getItem('nomeUsuario');
console.log(usuario); // "Maria Silva"

// Lendo o objeto (precisa converter de volta)
const prefsSalvas = JSON.parse(localStorage.getItem('preferenciasUsuario'));
console.log(prefsSalvas.tema); // "dark"
```

> `getItem` retorna `null` se a chave não existir — útil para verificar se um dado já está em cache.

### Removendo — removeItem(chave) e clear()

```js
localStorage.removeItem('curso'); // remove um item
localStorage.clear();             // limpa todo o localStorage do domínio
```

## Quando usar cada um

**Cookies:**
- Autenticação e sessão (tokens validados no servidor a cada requisição).
- Rastreamento entre visitas (ex.: Google Analytics).
- Pequenas preferências que o servidor precisa saber (ex.: idioma).

**Local Storage:**
- Preferências da UI (tema claro/escuro).
- Estado da aplicação (ex.: carrinho de compras durante a navegação).
- Dados para aplicações offline.
- Rascunho de formulários longos.

## Session Storage

- Para dados que só devem durar enquanto o usuário navega e depois ser descartados.
- **Diferença principal: ciclo de vida.** Os dados são apagados quando a sessão da página termina:
  - Recarregar a página (F5): os dados **permanecem**.
  - Fechar a aba e abrir outra para o mesmo site: os dados **são perdidos**.
- **Diferença de escopo:**
  - `localStorage`: compartilhado entre todas as abas e janelas da mesma origem.
  - `sessionStorage`: isolado por aba.
- **A API é idêntica** (`setItem`, `getItem`, `removeItem`, `clear`).

## Bibliografia

Mesma da aula 02: javascript.info, MDN Web Docs, W3Schools; Duckett (2016), Flanagan (2013), Silva (2014).
