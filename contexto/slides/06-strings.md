# Aula 06 — Strings

> Fonte: `contexto/pdfs/06. Strings.pdf` — Prof. José Arnaldo Mascagni de Holanda (IFSP Araraquara)

## Conceito

- Strings armazenam texto e são escritas com aspas.
- Também podem ser escritas com **Template Strings** (ou *template literals*).

## Template Strings

- Usam crases (`` ` ``) em vez de aspas.
- Permitem aspas simples e duplas dentro da string.
- Permitem strings em várias linhas.

```js
let texto = `Olá Mundo!`;

let texto = `Jonatas também é conhecido como "Johnny"`;

let texto =
`The quick
brown fox
jumps over
the lazy dog`;
```

### Interpolação

Template strings permitem usar variáveis dentro da string:

```js
let firstName = "John";
let lastName = "Doe";

let text = `Welcome ${firstName}, ${lastName}!`;
```

## Métodos de String

Strings são **primitivas e imutáveis**: todos os métodos produzem uma nova string sem alterar a original.

Métodos listados na aula: `length`, `charAt()`, `charCodeAt()`, `codePointAt()`, `concat()`, `at()`, `[ ]`, `slice()`, `substring()`, `substr()`, `toUpperCase()`, `toLowerCase()`, `isWellFormed()`, `toWellFormed()`, `trim()`, `trimStart()`, `trimEnd()`, `padStart()`, `padEnd()`, `repeat()`, `replace()`, `replaceAll()`, `split()`.

### length

```js
let texto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let tamanho = texto.length;
```

> No slide original está `text.length`; o nome correto da variável é `texto`.

### Extraindo caracteres

Três formas: `at(posição)`, `charAt(posição)` e acesso por índice `[]`.

```js
let text = "HELLO WORLD";
let char = text.charAt(0);  // H
let letter = text.at(1);    // E
let c = text[2];            // L
```

- `at()` é recente e aceita índices negativos; `charAt()` não.
- `[]` faz a string parecer um array (mas não é).
- Se não houver caractere, `[]` retorna `undefined` e `charAt()` retorna string vazia.
- É somente leitura: `str[0] = "A"` não gera erro, mas não funciona.

### Concatenação

`concat()` pode ser usado no lugar do `+`:

```js
text = "Hello" + " " + "World!";
text = "Hello".concat(" ", "World!");
```

### Extraindo partes

- `slice(início, fim)` — aceita parâmetros negativos
- `substring(início, fim)`
- `substr(início, tamanho)`

```js
let texto = "Apple, Banana, Kiwi";
let part1 = texto.slice(7, 13);      // Banana
let part2 = texto.slice(-12, -6);    // Banana
let part3 = texto.substring(7, 13);  // Banana
let part4 = texto.substr(7, 6);      // Banana
```

### Maiúsculas e minúsculas

```js
let text1 = "Hello World!";
let text2 = text1.toUpperCase(); // HELLO WORLD!
let text3 = text1.toLowerCase(); // hello world!
```

### Substituindo conteúdo

`replace()` substitui um valor por outro. Por padrão, só a **primeira** ocorrência.

```js
let text = "Please visit Microsoft and Microsoft!";
let newText1 = text.replace("Microsoft", "W3Schools");
let newText2 = text.replace(/MICROSOFT/i, "W3Schools"); // ER com case insensitive (i)
let newText3 = text.replace(/Microsoft/g, "W3Schools"); // ER para todas as ocorrências
```

Em 2021 foi introduzido `replaceAll()`, que substitui todas as ocorrências.

### Convertendo string em array — split()

- Sem separador: o array terá a string inteira no índice `[0]`.
- Com separador `""`: array de caracteres individuais.

```js
text.split(",")   // separa nas vírgulas
text.split(" ")   // separa nos espaços
text.split("|")   // separa nos "pipes"
text.split("")    // retorna array de caracteres simples
```

## Busca na string

### indexOf()

Retorna a posição da primeira ocorrência, ou `-1` se não encontrar. Veja também `lastIndexOf()` e `search()`.

```js
let text = "Please locate where 'locate' occurs!";
let index = text.indexOf("locate"); // 7
```

### match()

Retorna um array com os resultados da correspondência com outra string ou com uma expressão regular.

```js
let text = "The rain in SPAIN stays mainly in the plain";
text.match("ain");  // ain
text.match(/ain/g); // Array(3) [ "ain", "ain", "ain" ]
```

### includes()

Retorna `true` se a string contém o valor; senão, `false`.

```js
let text = "Hello world, welcome to the universe.";
text.includes("world"); // true
```

### startsWith() e endsWith()

```js
let arquivo = 'ifsp.jpg';
arquivo.startsWith('ifsp'); // true
arquivo.endsWith('jpg');    // true
```

## Bibliografia

Mesma da aula 02: javascript.info, MDN Web Docs, W3Schools; Duckett (2016), Flanagan (2013), Silva (2014).
