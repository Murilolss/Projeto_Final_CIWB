# Aula 15 — Expressões Regulares

> Fonte: `contexto/pdfs/15. Expressões Regulares.pdf` — Prof. José Arnaldo Mascagni de Holanda (IFSP Araraquara)

## O que é

- Um objeto que descreve um **padrão de caracteres**.
- Não é exclusivo do JavaScript; é um conceito usado em muitas linguagens.
- Serve para:
  1. **Validar (testar)**: o texto corresponde ao padrão? Ex.: "isso é um e-mail válido?"
  2. **Procurar (buscar)**: onde está o padrão no texto? Ex.: "encontre a palavra 'sistema'".
  3. **Substituir**: trocar o padrão por outro texto. Ex.: "censure todos os telefones".

## Como criar

**1. Literal (mais comum)** — `/padrao/modificadores`:

```js
let regexLiteral = /mundo/i;
```

**2. Construtor `RegExp` (mais dinâmico)** — útil quando o padrão vem de uma variável (ex.: input do usuário):

```js
let regexConstrutor = new RegExp("mundo", "i");
```

## Modificadores (flags)

- `i` (*ignore case*): ignora maiúsculas/minúsculas. `/abc/i` encontra "abc", "Abc", "ABC"…
- `g` (*global*): não para no primeiro match; encontra todas as ocorrências. Essencial para "substituir todos".

## Método test() — o validador

Pergunta "o padrão existe neste texto?" e retorna `true`/`false`. É método do objeto regex.

```js
// O texto que queremos analisar
const texto = "Bem-vindo ao curso de Análise e Desenvolvimento de Sistemas.";

// O padrão: a palavra "Sistemas" existe?
const padrao = /Sistemas/;
console.log( padrao.test(texto) ); // Output: true

// E se errarmos a capitalização?
const padraoMinusculo = /sistemas/;
console.log( padraoMinusculo.test(texto) ); // Output: false

// E se usarmos o modificador 'i'?
const padraoIgnoraCase = /sistemas/i;
console.log( padraoIgnoraCase.test(texto) ); // Output: true
```

## Método exec() — o detetive

Retorna um array com detalhes do match (ou `null`). Com a flag `g`, pode ser chamado várias vezes para achar os próximos.

```js
const texto = "O JavaScript é incrível. O JavaScript é popular.";
const padrao = /JavaScript/g; // Note o 'g'

let match = padrao.exec(texto);
console.log(match); // ["JavaScript", index: 2, ...] (Mostra o primeiro)

match = padrao.exec(texto);
console.log(match); // ["JavaScript", index: 27, ...] (Mostra o segundo)

match = padrao.exec(texto);
console.log(match); // null (Não há mais matches)
```

## Métodos de string com regex

Em vez de `regex.metodo(string)`, use `string.metodo(regex)`:
- `string.match(regex)`: array com todos os matches (sem `g`, se comporta como `exec()`).
- `string.search(regex)`: índice do primeiro match, ou `-1`.
- `string.replace(regex, "novo_texto")`: procura e substitui — o mais útil.

```js
const texto = "Meu gato é cinza e meu cachorro é marrom. Eu amo gato!";

// Usando match() para encontrar todas as ocorrências
const padraoGato = /gato/gi; // 'g' (global) e 'i' (ignore case)
const matches = texto.match(padraoGato);
console.log(matches); // ["gato", "gato"]

// Usando replace() para trocar TODAS as ocorrências
const novoTexto = texto.replace(padraoGato, "coelho");
console.log(novoTexto);
// "Meu coelho é cinza e meu cachorro é marrom. Eu amo coelho!"
```

## Brackets [ ] — conjuntos

| Padrão | Encontra |
|---|---|
| `[abc]` | "a" OU "b" OU "c" |
| `[a-z]` | qualquer letra minúscula |
| `[A-Z]` | qualquer letra maiúscula |
| `[0-9]` | qualquer dígito |
| `[^abc]` | qualquer coisa que **não** seja "a", "b" ou "c" (`^` dentro = negação) |

```js
let texto = "O número é 7. A nota é 9.";
let padraoNumeros = /[0-9]/g; // Encontre qualquer dígito
console.log(texto.match(padraoNumeros)); // ["7", "9"]

let padraoLetras = /[a-zA-Z]/g; // Encontre qualquer letra
// (Isso vai encontrar muitas coisas!)
```

## Metacaracteres (atalhos)

| Atalho | Significado |
|---|---|
| `\d` | um dígito (`[0-9]`) |
| `\D` | um não-dígito (`[^0-9]`) |
| `\w` | caractere de "palavra": letras, números e `_` (`[A-Za-z0-9_]`) |
| `\W` | não-caractere de palavra |
| `\s` | espaço em branco (espaço, tab…) |
| `\S` | não-espaço |
| `.` | coringa: **qualquer** caractere (exceto quebra de linha) |

## Quantificadores

Definem quantas vezes o caractere anterior deve ocorrer:

| Quantificador | Significado | Exemplo |
|---|---|---|
| `+` | um ou mais | |
| `*` | zero ou mais | |
| `?` | zero ou um (opcional) | |
| `{n}` | exatamente n vezes | `\d{5}` → 5 dígitos |
| `{n,}` | n ou mais vezes | `\d{5,}` → 5 ou mais dígitos |
| `{n,m}` | de n até m vezes | `\d{2,4}` → 2 a 4 dígitos |

## Desafio: validar CEP (12345-678)

5 dígitos `\d{5}` + hífen `-` + 3 dígitos `\d{3}` → `/\d{5}-\d{3}/`

```js
const cepValido = "12345-678";
const cepInvalido1 = "12345678";
const cepInvalido2 = "abcde-fgh";

const padraoCEP = /\d{5}-\d{3}/;

console.log( padraoCEP.test(cepValido) );    // Output: true
console.log( padraoCEP.test(cepInvalido1) ); // Output: false
console.log( padraoCEP.test(cepInvalido2) ); // Output: false
```

## Âncoras: ^ e $

- `^` (fora dos brackets): início do texto.
- `$`: fim do texto.
- **Problema:** o validador acima aceita "abc 12345-678 def", porque o padrão existe *dentro* do texto.
- **Solução:** ancorar o padrão.

```js
const textoSujo = "Meu CEP é 12345-678, pode enviar.";
const padraoCEP = /\d{5}-\d{3}/;           // Padrão solto
const padraoCEPAncorado = /^\d{5}-\d{3}$/; // Padrão ancorado

// O padrão solto encontra o CEP dentro do texto
console.log( padraoCEP.test(textoSujo) ); // Output: true

// O padrão ancorado falha, pois o texto NÃO É *EXATAMENTE* um CEP
console.log( padraoCEPAncorado.test(textoSujo) ); // Output: false

// O padrão ancorado só funciona para o texto limpo:
console.log( padraoCEPAncorado.test("12345-678") ); // Output: true
```

## Grupos ( ) e captura

- Parênteses criam um **grupo de captura**, com duas funções:
  - Agrupar quantificadores (ex.: `/(abc)+/` encontra "abcabcabc").
  - "Capturar" o texto do match.
- No `replace()`, os grupos são referenciados por `$1`, `$2`, `$3`…

```js
// Exemplo: Inverter Nomes (Formato "Sobrenome, Nome")
const textoNomes = "Silva, Joao\nCosta, Maria";
// Padrão:
// 1. Início da linha (^)
// 2. Um ou mais caracteres de palavra (\w+) -> Capturar (Grupo 1)
// 3. Uma vírgula e um espaço (, )
// 4. Um ou mais caracteres de palavra (\w+) -> Capturar (Grupo 2)
// 5. Fim da linha ($)
const padraoNome = /^(\w+), (\w+)$/gm; // 'g' global, 'm' multiline

const textoFormatado = textoNomes.replace(padraoNome, "$2 $1");
// $2 é o Grupo 2 ("João")
// $1 é o Grupo 1 ("Silva")

console.log(textoFormatado);
// Output:
// João Silva
// Maria Costa
```

## Resumo

- Regex é um objeto que descreve padrões (`/padrao/flags`).
- `test()` para validar (true/false).
- `match()`, `search()`, `replace()` para buscar e manipular strings.
- Blocos: brackets `[]`, metacaracteres `\d \w \s .`, quantificadores `+ * ? {}`.
- Âncoras `^` e `$` para validação precisa.
- Grupos `()` para capturar e usar com `$1`, `$2` no `replace()`.

## Bibliografia

Mesma da aula 02: javascript.info, MDN Web Docs, W3Schools; Duckett (2016), Flanagan (2013), Silva (2014).
