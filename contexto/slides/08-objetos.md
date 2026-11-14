# Aula 08 — Objetos

> Fonte: `contexto/pdfs/08. Objetos.pdf` — Prof. José Arnaldo Mascagni de Holanda (IFSP Araraquara)

## Conceito

- Um objeto é uma variável que pode armazenar muitas variáveis.
- É uma coleção de pares **chave–valor**; cada chave (nome da propriedade) tem um valor.
- Pode descrever qualquer coisa: casas, carros, pessoas, animais…

Exemplo (objeto carro):

| Propriedades | Métodos |
|---|---|
| `car.name = Fiat` | `car.start()` |
| `car.model = 500` | `car.drive()` |
| `car.weight = 850kg` | `car.brake()` |
| `car.color = white` | `car.stop()` |

## Declaração (objeto literal)

Um **objeto literal** é uma lista de pares `chave:valor` entre chaves `{ }`. Esses pares são as propriedades do objeto.

```js
const person = {firstName:"John", lastName:"Doe", age:50, eyeColor:"blue"};

const person = {
  firstName: "John",
  lastName: "Doe",
  age: 50,
  eyeColor: "blue"
};

const person = {};
person.firstName = "John";
person.lastName = "Doe";
person.age = 50;
person.eyeColor = "blue";
```

## Propriedades

Três formas de acessar uma propriedade:

```js
person.lastName;
person["lastName"];
let c = 'lastName';
person[c]
```

> No slide original a variável é `'lastname'` (minúsculo); o nome da propriedade é `lastName`.

Para adicionar uma nova propriedade, basta atribuir um valor:

```js
person.nationality = "English";
```

## Métodos

Métodos são ações que podem ser feitas no objeto: funções armazenadas como valores de propriedades.

```js
const person = {
  firstName: "John",
  lastName : "Doe",
  id       : 5566,
  fullName : function() {
    return this.firstName + " " + this.lastName;
  }
};
```

- `this` se refere ao objeto `person`.
- `this.firstName` é a propriedade `firstName` do objeto `person`.

## Funções construtoras

Para criar muitos objetos do mesmo tipo, use uma **função construtora**. Boa prática: nome com a primeira letra maiúscula.

```js
function Person(first, last, age, eye) {
  this.firstName = first;
  this.lastName = last;
  this.age = age;
  this.eyeColor = eye;
}

const myFather = new Person("John", "Doe", 50, "blue");
const myMother = new Person("Sally", "Rally", 48, "green");
const mySister = new Person("Anna", "Rally", 18, "green");
const mySelf = new Person("Johnny", "Rally", 22, "green");
```

## Classes

- Introduzidas no ECMAScript 2015.
- Forma mais simples e clara de criar objetos e lidar com herança.
- Declarações de função sofrem *hoisting*; declarações de classe não.

```js
class Person {
  constructor(first, last, age, eye) {
    this.firstName = first;
    this.lastName = last;
    this.age = age;
    this.eyeColor = eye;
  }

  fullName() {
    return this.firstName + " " + this.lastName;
  }
}

const me = new Person("José", "Holanda", 43, "black");
```

## Objetos aninhados

Valores de propriedades podem ser outros objetos:

```js
myObj = {
  name:"John",
  age:30,
  myCars: {
    car1:"Ford",
    car2:"BMW",
    car3:"Fiat"
  }
}

myObj.myCars.car2;
myObj.myCars["car2"];
myObj["myCars"]["car2"];
```

## Laço for...in

Percorre as propriedades de um objeto. Use `person[x]` no loop; `person.x` **não** funciona (x é a variável do loop).

```js
const person = {
  name: "John",
  age: 30,
  city: "New York"
};

let text = "";
for (let x in person) {
  text += person[x] + " ";
};
```

## Object.entries()

Facilita o uso de objetos em loops:

```js
const fruits = {Bananas:300, Oranges:200, Apples:500};

let text = "";
for (let [fruit, value] of Object.entries(fruits)) {
  text += fruit + ": " + value + "<br>";
}
```

## Desestruturação

Desempacota propriedades de um objeto em variáveis:

```js
const person = {
  firstName: "John",
  lastName: "Doe",
  age: 50
};

let {firstName, lastName} = person;
```

## Get / Set

Getters e setters permitem obter ou definir propriedades de um objeto:

```js
const person = {
  firstName: "John",
  lastName: "Doe",
  language: "en",
  get lang() {
    return this.language;
  },
  set lang(lang) {
    this.language = lang;
  }
};
```

## Bibliografia

Mesma da aula 02: javascript.info, MDN Web Docs, W3Schools; Duckett (2016), Flanagan (2013), Silva (2014).
