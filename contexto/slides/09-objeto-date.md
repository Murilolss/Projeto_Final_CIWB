# Aula 09 — Objeto Date

> Fonte: `contexto/pdfs/09. Objeto Date.pdf` — Prof. José Arnaldo Mascagni de Holanda (IFSP Araraquara)

## Conceito

- Objetos `Date` são **estáticos**: o relógio do computador "anda", o objeto Date não.
- Por padrão, o JavaScript usa o fuso horário do navegador e exibe a data como string completa:

```
Mon Sep 29 2025 16:37:15 GMT-0300 (Horário Padrão de Brasília)
```

## Criando datas

```js
// Data e hora atuais
const d = new Date();

// A partir de uma string de data
const d = new Date("October 13, 2014 11:13:00");
const s = new Date("2022-03-25");

// Com 7 números: ano, mês, dia, hora, minuto, segundo, milissegundo
const d = new Date(2018, 11, 24, 10, 33, 30, 0);
```

> Atenção: o mês começa em 0 (janeiro = 0, dezembro = 11).

## Milissegundos

- O JavaScript armazena datas como milissegundos desde 1º de janeiro de 1970, 00:00:00 UTC (tempo zero).
- Um dia (24 h) = 86.400.000 ms.

```js
const c = new Date(100000000000);
// Sat Mar 03 1973 06:46:40 GMT-0300 (Horário Padrão de Brasília)
```

## Formatos de entrada

| Tipo | Exemplo |
|---|---|
| ISO Date | `"2015-03-25"` (padrão internacional) |
| Short Date | `"03/25/2015"` |
| Long Date | `"Mar 25 2015"` ou `"25 Mar 2015"` |

- O formato ISO segue um padrão estrito.
- Os demais não são tão bem definidos e podem variar conforme o navegador.

## Métodos get

| Método | Descrição |
|---|---|
| `getFullYear()` | Ano com 4 dígitos (yyyy) |
| `getMonth()` | Mês (0–11) |
| `getDate()` | Dia do mês (1–31) |
| `getDay()` | Dia da semana (0–6) |
| `getHours()` | Hora (0–23) |
| `getMinutes()` | Minuto (0–59) |
| `getSeconds()` | Segundo (0–59) |
| `getMilliseconds()` | Milissegundo (0–999) |
| `getTime()` | Milissegundos desde 1º/jan/1970 |

## Métodos set

| Método | Descrição |
|---|---|
| `setDate()` | Dia do mês (1–31) |
| `setFullYear()` | Ano (yyyy) |
| `setHours()` | Hora (0–23) |
| `setMilliseconds()` | Milissegundos (0–999) |
| `setMinutes()` | Minutos (0–59) |
| `setMonth()` | Mês (0–11) |
| `setSeconds()` | Segundos (0–59) |
| `setTime()` | Milissegundos desde 1º/jan/1970 |

## Comparação de datas

```js
let text = "";
const today = new Date();
const someday = new Date();
someday.setFullYear(2100, 0, 14);

if (someday > today) {
  text = "Today is before January 14, 2100.";
} else {
  text = "Today is after January 14, 2100.";
}
```

## Bibliografia

Mesma da aula 02: javascript.info, MDN Web Docs, W3Schools; Duckett (2016), Flanagan (2013), Silva (2014).
