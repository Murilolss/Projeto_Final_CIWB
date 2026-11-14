# Aula 02 — Fundamentos do JavaScript

> Fonte: `contexto/pdfs/02. Fundamentos do JavaScript.pdf` — Prof. José Arnaldo Mascagni de Holanda (IFSP Araraquara)

## A tag `<script>`

- Em HTML, código JavaScript é inserido entre as tags `<script>` e `</script>`.
- Exemplos antigos podem usar o atributo `type`: `<script type="text/javascript">`.
- O atributo `type` não é obrigatório: o JavaScript é a linguagem de script padrão no HTML.

```html
<script>
    alert("My First JavaScript");
</script>
```

## JavaScript externo

- Scripts também podem ser colocados em arquivos externos (extensão `.js`).
- São práticos quando o mesmo código é usado em muitas páginas diferentes.
- Para usar, coloque o nome do arquivo no atributo `src` da tag `<script>`:

```html
<script src="myScript.js"></script>
```

**Vantagens:**
- Separa o HTML do código.
- Torna o HTML e o JavaScript mais fáceis de ler e manter.
- Arquivos JavaScript em cache podem acelerar o carregamento das páginas.

Para vários arquivos, use várias tags `<script>`:

```html
<script src="myScript1.js"></script>
<script src="myScript2.js"></script>
```

Um script externo pode ser referenciado de 3 maneiras:

```html
<!-- URL completa -->
<script src="https://www.myurl.com/js/myScript.js"></script>
<!-- Caminho de arquivo -->
<script src="/js/myScript.js"></script>
<!-- Sem caminho -->
<script src="myScript.js"></script>
```

## Posicionamento do JavaScript

- Pode haver qualquer quantidade de scripts em um documento HTML.
- Os scripts podem ficar no `<body>`, no `<head>` ou em ambos.
- O script se comporta como se estivesse exatamente onde a tag `<script>` foi inserida.
- **Colocar os scripts no final do `<body>` melhora a velocidade de exibição**, porque a interpretação do script desacelera a exibição.

## Saída de dados

O JavaScript pode "exibir" dados de diferentes maneiras:
- Em um elemento HTML, com `innerHTML` ou `innerText`.
- Na saída HTML, com `document.write()`.
- Em uma caixa de alerta, com `window.alert()`.
- No console do navegador, com `console.log()`.

### innerHTML

- Para acessar um elemento HTML, use `document.querySelector("#id")`.
- Use o atributo `id` para identificar o elemento e a propriedade `innerHTML` para alterar seu conteúdo:

```html
<p id="demo"></p>

<script>
document.querySelector("#demo").innerHTML = "<h1>Olá mundo!</h1>";
</script>
```

> Use `innerHTML` quando quiser alterar um elemento HTML.
> Use `innerText` quando quiser alterar apenas o texto simples.

### document.write()

- Conveniente para testes.
- Usar `document.write()` **depois** que o documento foi carregado apaga todo o HTML existente.

```html
<!DOCTYPE html>
<html>
    <body>
        <h1>Título</h1>
        <p>parágrafo</p>

        <script>
        document.write(5 + 6);
        </script>
    </body>
</html>
```

### window.alert()

- Exibe dados em uma caixa de alerta. A palavra-chave `window` pode ser omitida.
- `window` é o objeto de escopo global: por padrão, variáveis, propriedades e métodos pertencem a ele.

```html
<script>
//window.alert(5 + 6);
alert(5 + 6);
</script>
```

### console.log()

- Para depuração: a saída vai para o console das ferramentas de desenvolvimento do navegador.

```html
<script>
console.log(5 + 6);
</script>
```

## Entrada de dados (por enquanto…)

`window.prompt()` exibe uma caixa de diálogo com uma mensagem opcional, pedindo que o usuário digite um texto.

```js
resultado = window.prompt(texto, valor);
```

- **resultado**: string com o texto digitado pelo usuário, ou `null`.
- **texto**: string exibida ao usuário (opcional).
- **valor**: string com o valor padrão da caixa de texto (opcional).

## Ponto e vírgula

- Separam as declarações em JavaScript. Adicione `;` ao final de cada declaração executável.

```js
let a, b, c;
a = 5;
b = 6;
c = a + b;
```

- Separadas por `;`, várias declarações podem ficar na mesma linha:

```js
a = 5; b = 6; c = a + b;
```

> Encerrar declarações com ponto e vírgula não é obrigatório, mas é **altamente recomendado**.

## Comentários

- Servem para explicar o código ou impedir a execução ao testar alternativas.
- Uma linha: `//`. Múltiplas linhas: `/* ... */`.
- É mais comum usar comentários de uma linha; os de bloco são usados para documentação formal.

## Variáveis

Podem ser declaradas de 4 maneiras:

```js
// Automaticamente
x = 5;
y = 6;
z = x + y;

// Usando var
var x = 5;
var y = 6;
var z = x + y;

// Usando let
let x = 5;
let y = 6;
let z = x + y;

// Usando const
const x = 5;
const y = 6;
const z = x + y;
```

**Quando usar `var`, `let` ou `const`?**
- Sempre declare variáveis.
- Sempre use `const` se o valor não deve ser alterado.
- Sempre use `const` se o tipo não deve ser alterado (Arrays e Objetos).
- Use `let` somente se não puder usar `const`.
- Use `var` somente se for necessário suportar navegadores antigos.

**Declaração:**
- Criar uma variável é "declarar" a variável (com `var` ou `let`).
- Após a declaração, a variável não tem valor (é `undefined`).
- Boa prática: declarar todas as variáveis no início do script.

## Escopo de variáveis

**Escopo de bloco:** antes do ES6 (2015) o JavaScript só tinha escopo global e de função. O ES6 introduziu `let` e `const`, que têm escopo de bloco.

```js
{
  let x = 2;
}
// x NÃO pode ser usado aqui
```

**Escopo global:** variáveis declaradas com `var` não têm escopo de bloco.

```js
{
  var x = 2;
}
// x PODE ser usado aqui
```

## const

- Variáveis `const` devem receber um valor na declaração.
- `const` não define um valor constante, e sim uma **referência constante** a um valor.
- Você **não pode**: reatribuir um valor, um array ou um objeto constante.
- Você **pode**: alterar os elementos de um array constante e as propriedades de um objeto constante.

## Operadores

Tipos: aritméticos, de atribuição, de comparação, de strings, lógicos, bit a bit, ternário e de tipo.

### Aritméticos

| Operador | Descrição |
|---|---|
| `+` | Adição |
| `-` | Subtração |
| `*` | Multiplicação |
| `**` | Exponenciação (ES2016) |
| `/` | Divisão |
| `%` | Módulo (resto da divisão) |
| `++` | Incremento |
| `--` | Decremento |

### Adicionando strings e números

O `+` também concatena strings:

```js
let text1 = "John";
let text2 = "Doe";
let text3 = text1 + " " + text2;

let x = 5 + 5;       // 10
let y = "5" + 5;     // 55
let z = "Hello" + 5; // Hello5
```

### Atribuição

| Operador | Exemplo | Equivale a |
|---|---|---|
| `=` | `x = y` | `x = y` |
| `+=` | `x += y` | `x = x + y` |
| `-=` | `x -= y` | `x = x - y` |
| `*=` | `x *= y` | `x = x * y` |
| `/=` | `x /= y` | `x = x / y` |
| `%=` | `x %= y` | `x = x % y` |
| `**=` | `x **= y` | `x = x ** y` |

### Comparação

| Operador | Descrição |
|---|---|
| `==` | igual a |
| `===` | valor e tipo iguais |
| `!=` | diferente |
| `!==` | valor ou tipo diferentes |
| `>` | maior que |
| `<` | menor que |
| `>=` | maior ou igual a |
| `<=` | menor ou igual a |
| `?` | operador ternário |

Todos os operadores de comparação também podem ser usados em strings.

### Lógicos

| Operador | Descrição |
|---|---|
| `&&` | E lógico |
| `\|\|` | OU lógico |
| `!` | NÃO lógico |

### De tipo

| Operador | Descrição |
|---|---|
| `typeof` | Retorna o tipo de uma variável |
| `instanceof` | Retorna `true` se um objeto é instância de um tipo de objeto |

## Bibliografia

- [The Modern JavaScript Tutorial](https://javascript.info), [MDN Web Docs](https://developer.mozilla.org), [W3Schools](https://www.w3schools.com)
- DUCKETT, J. *Javascript e Jquery: desenvolvimento de interfaces web interativas*. Alta Books, 2016.
- FLANAGAN, D. *JavaScript: o guia definitivo*. 6. ed. Bookman, 2013.
- SILVA, M. S. *Web Design Responsivo*. Novatec, 2014.
