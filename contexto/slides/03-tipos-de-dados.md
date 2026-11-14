# Aula 03 — Tipos de dados

> Fonte: `contexto/pdfs/03. Tipos de dados.pdf` — Prof. José Arnaldo Mascagni de Holanda (IFSP Araraquara)

## Tipos dinâmicos

O JavaScript tem tipos dinâmicos: a mesma variável pode armazenar diferentes tipos de dados.

```js
let x;        // Agora x é undefined
x = 5;        // Agora x é um Number
x = "John";   // Agora x é uma String
```

## Strings

- Uma string é uma sequência de caracteres, como `"John Doe"`.
- São escritas entre aspas simples ou duplas:

```js
// Aspas duplas:
let carName1 = "Volvo XC60";

// Aspas simples:
let carName2 = 'Volvo XC60';
```

## Números

- Todos os números em JavaScript são armazenados como ponto flutuante de 64 bits (`double`).
- Podem ser escritos com ou sem casas decimais:

```js
// Com decimais:
let x1 = 34.00;

// Sem decimais:
let x2 = 34;
```

> A maioria das linguagens tem vários tipos numéricos (inteiros: byte, short, int, long; reais: float, double). Em JavaScript há um único tipo: **double** (ponto flutuante de 64 bits).

### BigInt

Tipo de dado do ES2020 para inteiros muito grandes, que não cabem em um número normal:

```js
let x = BigInt("123456789012345678901234567890");
```

### Notação científica

```js
let y = 123e5;    // 12300000
let z = 123e-5;   // 0.00123
```

## Booleanos

Frequentemente usados em testes condicionais:

```js
let x = 5;
let y = 5;
let z = 6;
(x == y)   // Retorna true
(x == z)   // Retorna false
```

## Arrays

- Escritos com colchetes `[]`, itens separados por vírgula.
- Os índices começam em zero: o primeiro item é `[0]`, o segundo `[1]` etc.

```js
const cars = ["Saab", "Volvo", "BMW"];
```

## Objetos

- Escritos com chaves `{}`.
- Propriedades são pares `nome:valor` separados por vírgula.

```js
const pessoa = {nome:"João", sobrenome:"Silva", idade:50, peso:80.4};
```

O objeto `pessoa` tem 4 propriedades: `nome`, `sobrenome`, `idade` e `peso`.

## undefined

Uma variável sem valor tem o valor `undefined`, e seu tipo também é `undefined`.

```js
let car;            // Valor é undefined, tipo é undefined
car = undefined;    // Valor é undefined, tipo é undefined
```

## Bibliografia

Mesma da aula 02: javascript.info, MDN Web Docs, W3Schools; Duckett (2016), Flanagan (2013), Silva (2014).
