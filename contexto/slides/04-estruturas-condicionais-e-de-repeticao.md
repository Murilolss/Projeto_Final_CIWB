# Aula 04 — Estruturas condicionais e de repetição

> Fonte: `contexto/pdfs/04. Estruturas condicionais e de repetição.pdf` — Prof. José Arnaldo Mascagni de Holanda (IFSP Araraquara)

## Declarações condicionais

- **if**: executa um bloco se uma condição for verdadeira.
- **else**: executa um bloco se a mesma condição for falsa.
- **else if**: testa uma nova condição se a primeira for falsa.
- **switch**: especifica vários blocos alternativos de código.

### if

```js
if (condição) {
  //  bloco de código a ser executado se a condição for verdadeira
}
```

```js
if (hora < 18) {
  cumprimento = "Boa tarde";
}
```

### else

```js
if (condição) {
  // bloco de código a ser executado se a condição for verdadeira
} else {
  // bloco de código a ser executado se a condição for falsa
}
```

```js
if (hora < 18) {
  cumprimento = "Boa tarde";
} else {
  cumprimento = "Boa noite";
}
```

### else if

```js
if (condição1) {
  //  executado se condição1 for verdadeira
} else if (condição2) {
  //  executado se condição1 for falsa e condição2 for verdadeira
} else {
  // executado se condição1 for falsa e condição2 for falsa
}
```

```js
if (hora < 12) {
  cumprimento = "Bom dia";
} else if (hora < 18) {
  cumprimento = "Boa tarde";
} else {
  cumprimento = "Boa noite";
}
```

### Exemplo: link aleatório

Escreve um link para o IFSP Câmpus Araraquara ou para o IFSP (reitoria), com 50% de chance para cada um:

```js
let texto;

if (Math.random() < 0.5) {
  texto = "<a href='https://www.arq.ifsp.edu.br/'>IFSP Campus Araraquara</a>";
} else {
  texto = "<a href='https://www.ifsp.edu.br/'>IFSP</a>";
}

document.querySelector("#acesso").innerHTML = texto;
```

## switch

- Com base em uma expressão, seleciona um ou mais blocos de código para executar.
- Alternativa mais legível a vários `if...else if...else` quando há muitos valores possíveis.

```js
switch(expressão) {
  case x:
    // bloco de código
    break;
  case y:
    // bloco de código
    break;
  default:
    // bloco de código
}
```

Como funciona:
- A expressão é avaliada uma vez.
- O valor é comparado com o de cada `case`.
- Se houver correspondência, o bloco associado é executado.
- Se não houver, nenhum código é executado (exceto o `default`, se existir).

> **`break` é crucial para evitar o "fall-through".** Sem ele, o código continua executando os próximos `case` (e o `default`), mesmo que os valores não correspondam.

### Exemplo: dia da semana

`getDay()` retorna o dia da semana como número de 0 a 6 (Domingo = 0, Segunda = 1, …).

```js
switch (new Date().getDay()) {
  case 0:
    dia = "Domingo";
    break;
  case 1:
    dia = "Segunda-feira";
    break;
  case 2:
    dia = "Terça-feira";
    break;
  case 3:
    dia = "Quarta-feira";
    break;
  case 4:
    dia = "Quinta-feira";
    break;
  case 5:
    dia = "Sexta-feira";
    break;
  case 6:
    dia = "Sábado";
}

document.querySelector("#msg").innerHTML = "Hoje é " + dia;
```

## Loops

Executam um bloco de código várias vezes.

| Tipo | Descrição |
|---|---|
| `for` | Itera sobre valores e expressões |
| `while` | Itera sobre uma condição |
| `do...while` | Itera sobre uma condição |
| `for...in` | Itera sobre as propriedades de um objeto |
| `for...of` | Itera sobre arrays (e outros iteráveis) |
| `forEach()` | Itera sobre cada elemento de um array |

### for

```js
for (exp1; exp2; exp3) {
  // bloco de código a ser executado
}
```

- **exp1**: executada uma vez antes do bloco.
- **exp2**: condição para executar o bloco.
- **exp3**: executada a cada execução do bloco.

```js
for (let i = 0; i < 5; i++) {
  text += "O número é " + i + "<br>";
}
```

### while

Repete o bloco enquanto a condição for verdadeira.

```js
while (condição) {
  // bloco de código a ser executado
}
```

```js
while (i < 10) {
  texto += "O número é " + i;
  i++;
}
```

> Se você esquecer de incrementar a variável da condição, o loop nunca termina e o navegador trava.

### do...while

Executa o bloco uma vez antes de verificar a condição, e repete enquanto ela for verdadeira. Roda **pelo menos uma vez**, mesmo que a condição seja falsa desde o início.

```js
do {
  // bloco de código a ser executado
}
while (condição);
```

```js
do {
  texto += "O número é " + i;
  i++;
}
while (i < 10);
```

## Bibliografia

Mesma da aula 02: javascript.info, MDN Web Docs, W3Schools; Duckett (2016), Flanagan (2013), Silva (2014).
