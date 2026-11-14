# Aula 07 — Arrays

> Fonte: `contexto/pdfs/07. Arrays.pdf` — Prof. José Arnaldo Mascagni de Holanda (IFSP Araraquara)

## Conceito

Um array é um tipo de objeto projetado para armazenar coleções de dados. Características:
- **Elementos**: é uma lista de valores, chamados elementos.
- **Ordenados**: organizados pelo índice.
- **Indexação a partir de zero**: o primeiro elemento está no índice 0.
- **Tamanho dinâmico**: crescem ou diminuem conforme elementos são adicionados ou removidos.
- **Heterogêneos**: podem guardar tipos diferentes (números, strings, objetos, outros arrays).

## Criar um array

É prática comum declarar arrays com `const`.

```js
const cars = ["Saab", "Volvo", "BMW"];

const cars = [
  "Saab",
  "Volvo",
  "BMW"
];
```

## Acesso e atualização

```js
const cars = ["Saab", "Volvo", "BMW"];
let car = cars[0];
cars[0] = "Opel";
```

## Percorrendo o array

### for

```js
const fruits = ["Banana", "Orange", "Apple", "Mango"];
let fLen = fruits.length;

let text = "<ul>";
for (let i = 0; i < fLen; i++) {
  text += "<li>" + fruits[i] + "</li>";
}
text += "</ul>";
```

### forEach()

```js
const fruits = ["Banana", "Orange", "Apple", "Mango"];

let text = "<ul>";
fruits.forEach(myFunction);
text += "</ul>";

function myFunction(value) {
  text += "<li>" + value + "</li>";
}
```

A função de callback pode receber 3 argumentos, nesta ordem: **o valor do item**, **o índice do item** e **o próprio array**.

### for...of

```js
const fruits = ["Banana", "Orange", "Apple", "Mango"];

let text = "<ul>";
for (let f of fruits){
  text += "<li>" + f + "</li>";
}
text += "</ul>";
```

## Adicionando elementos

- `push()`: adiciona ao final.
- `unshift()`: adiciona ao início.

```js
const fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.push("Kiwi");     // adiciona após "Mango"
fruits.unshift("Lemon"); // adiciona antes de "Banana"
```

## Removendo elementos

- `pop()`: remove o último elemento.
- `shift()`: remove o primeiro e "desloca" os demais para um índice inferior.
- Ambos retornam o valor removido.

```js
const fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.pop();   // retira "Mango"
fruits.shift(); // retira "Banana"
```

## at()

Retorna o elemento de um índice (igual a `[]`), mas aceita índices negativos.

```js
const fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.at(2);  // Apple
fruits.at(-1); // Mango
```

## delete

`delete` deixa lacunas indefinidas no array. **Use `pop()` ou `shift()` no lugar.**

```js
const fruits = ["Banana", "Orange", "Apple", "Mango"];
delete fruits[1];
// Array(4) [ "Banana", <1 empty slot>, "Apple", "Mango" ]  — length continua 4
```

## concat()

Cria um novo array mesclando arrays existentes.

```js
const myGirls = ["Cecilie", "Lone"];
const myBoys = ["Emil", "Tobias", "Linus"];

const myChildren = myGirls.concat(myBoys); // [ "Cecilie", "Lone", "Emil", "Tobias", "Linus" ]
```

## splice()

Adiciona novos itens e também remove elementos **sem deixar lacunas**. Sintaxe: `splice(posição, quantosRemover, ...itensParaAdicionar)`.

```js
const fruits = ["Banana", "Laranja", "Maçã", "Manga"];
fruits.splice(2, 0, "Limão", "Kiwi");      // [ "Banana", "Laranja", "Limão", "Kiwi", "Maçã", "Manga" ]
fruits.splice(2, 2, "Melão", "Jabuticaba"); // [ "Banana", "Laranja", "Melão", "Jabuticaba", "Maçã", "Manga" ]
fruits.splice(0, 1);                       // [ "Laranja", "Melão", "Jabuticaba", "Maçã", "Manga" ]
```

## Busca no array

- `indexOf()`: procura um valor e retorna sua posição.
- `lastIndexOf()`: igual ao `indexOf()`, mas retorna a última ocorrência.
- `includes()`: verifica se um elemento está presente (inclusive `NaN`, ao contrário do `indexOf`).

## sort() e reverse()

- `sort()`: ordena em ordem alfabética.
- `reverse()`: inverte a ordem.
- Veja também `toSorted()` e `toReversed()` (não alteram o original).

```js
const fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.sort();
fruits.reverse();
```

### sort() numérico

Por padrão, `sort()` ordena como **strings**: `"25"` fica depois de `"100"` porque `"2"` > `"1"`. Para números, passe uma função de comparação:

```js
const points = [40, 100, 1, 5, 25, 10];
// ascendente
points.sort(function(a, b){return a - b});
// descendente
points.sort(function(a, b){return b - a});
```

- Resultado negativo: `a` vem antes de `b`.
- Resultado positivo: `b` vem antes de `a`.
- Resultado 0: a ordem de `a` e `b` não muda.

## forEach()

Chama uma função de callback uma vez para cada elemento.

```js
const numbers = [45, 4, 9, 16, 25];
let txt = "";
numbers.forEach(myFunction);

function myFunction(value) {
  txt += value + "<br>";
}
```

## Bibliografia

Mesma da aula 02: javascript.info, MDN Web Docs, W3Schools; Duckett (2016), Flanagan (2013), Silva (2014).
