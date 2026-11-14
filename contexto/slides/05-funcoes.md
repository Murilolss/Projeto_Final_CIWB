# Aula 05 — Funções

> Fonte: `contexto/pdfs/05. Funções.pdf` — Prof. José Arnaldo Mascagni de Holanda (IFSP Araraquara)

## Conceito

- Funções são blocos de construção fundamentais em toda programação.
- Permitem melhor organização do código, modularidade e eficiência.
- São blocos de código reutilizáveis, projetados para executar uma tarefa específica.
- São executadas quando são "chamadas" ou "invocadas".

## Sintaxe

- Palavra-chave `function`, seguida do **nome**, de **parênteses** `( )` e de **chaves** `{ }`.
- O nome segue as regras de nomes de variáveis.
- **Parâmetros** opcionais ficam dentro dos parênteses: `(p1, p2, p3)`.
- O código fica dentro das chaves.
- A função pode, opcionalmente, retornar um valor para quem a chamou.

```js
function name(p1, p2, p3) {
    // code
}
```

## Invocação

O código da função é executado quando "algo" a invoca:
- A partir de código JavaScript;
- Quando ocorre um evento (ex.: o usuário clica em um botão);
- Automaticamente (auto-invocada).

O operador `()` invoca a função.

```js
function toCelsius(fahrenheit) {
  return (5/9) * (fahrenheit-32);
}

let valor = toCelsius(77);
```

## Cuidado!

Chamar com parâmetros incorretos pode retornar uma resposta incorreta:

```js
let valor = toCelsius();   // NaN
```

Acessar a função **sem `()`** retorna a própria função, não o resultado:

```js
let valor = toCelsius;     // function toCelsius(f) { return (5/9) * (f-32); }
```

## Parâmetros e argumentos

- **Parâmetros**: nomes listados na definição da função.
- **Argumentos**: valores reais passados para a função.
- Regras:
  - Definições de função não especificam tipos para os parâmetros.
  - Funções não verificam o tipo dos argumentos.
  - Funções não verificam o número de argumentos recebidos.

## Parâmetros padrão

Argumentos faltando ficam `undefined`. Às vezes é melhor atribuir um valor padrão:

```js
function myFunction(x, y) {
  if (y === undefined) {
    y = 2;
  }
}
```

```js
function myFunction(x, y = 10) {
  return x + y;
}
myFunction(5);
```

## Parâmetro rest

O parâmetro rest (`...`) permite tratar um número indefinido de argumentos como um array:

```js
function soma(...args) {
  let s = 0;
  for (let arg of args) s += arg;
  return s;
}

let x = soma(4, 9, 16, 25, 29, 100, 66, 77);
```

## O objeto `arguments`

Toda função tem um objeto interno `arguments`, uma lista (semelhante a um array) com todos os argumentos usados na chamada.

```js
x = findMax(1, 123, 500, 115, 44, 88);

function findMax() {
  let max = -Infinity;
  for (let i = 0; i < arguments.length; i++) {
    if (arguments[i] > max) {
      max = arguments[i];
    }
  }
  return max;
}
```

## Passagem por valor e por referência

**Argumentos são passados por valor:**
- A função recebe só os valores, não os endereços.
- Alterar o valor de um argumento dentro da função não altera o original.
- As alterações não são visíveis fora da função.

**Objetos se comportam como passados por referência:**
- Referências de objetos também são valores.
- Se a função altera uma **propriedade** de um objeto, altera o objeto original.
- As alterações em propriedades são visíveis fora da função.

## Function expression (funções anônimas)

Uma função pode ser definida por uma expressão e armazenada em uma variável:

```js
const x = function (a, b) {return a * b};
let z = x(4, 3);
```

- Funções armazenadas em variáveis não precisam de nome; são chamadas pelo nome da variável.
- Terminam com ponto e vírgula porque fazem parte de uma instrução executável.

## Arrow functions (funções seta)

Introduzidas no ES6, permitem uma sintaxe mais curta.

```js
let myFunction = function(a, b) {return a * b}
// vira
let myFunction = (a, b) => a * b;
```

```js
let hello = function() {
    return "Hello World!";
}
// vira
let hello = () => {
  return "Hello World!";
}
```

Com **apenas uma instrução** que retorna um valor, dá para remover as chaves e o `return`:

```js
let hello = () => "Hello World!";
```

Parâmetros vão dentro dos parênteses; com **um único** parâmetro, os parênteses podem ser omitidos:

```js
let hello = (val) => "Hello " + val;
let hello = val => "Hello " + val;
```

## Callbacks

- Uma callback é uma função passada como argumento para outra função.
- Permite que uma função chame outra.
- Pode ser executada depois que outra função terminou.

```js
function myDisplayer(some) {
  document.getElementById("demo").innerHTML = some;
}

function myCalculator(num1, num2, myCallback) {
  let sum = num1 + num2;
  myCallback(sum);
}

myCalculator(5, 5, myDisplayer);
```

## Bibliografia

Mesma da aula 02: javascript.info, MDN Web Docs, W3Schools; Duckett (2016), Flanagan (2013), Silva (2014).
