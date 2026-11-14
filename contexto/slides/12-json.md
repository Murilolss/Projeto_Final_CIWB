# Aula 12 — JSON (e fetch com async/await)

> Fonte: `contexto/pdfs/12.JSON.pdf` — Prof. José Arnaldo Mascagni de Holanda (IFSP Araraquara)
> O "exemplo prático" citado no fim da aula está em `contexto/codigo-exemplos/11.json/` (resumido abaixo).

## O que é JSON

- **JavaScript Object Notation** (Notação de Objeto JavaScript).
- Formato de texto simples para armazenar e transportar dados.
- Sintaxe semelhante à de objetos em JavaScript.
- Usado para enviar, receber e armazenar dados.

```js
// Objeto JS
{"name":"John", "age":30, "car":null}

// JSON string
'{"name":"John", "age":30, "car":null}'
```

## JSON vs. XML

XML (eXtensible Markup Language) dominava a troca de dados antes.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<endereco>
    <cep>31270901</cep>
    <city>Belo Horizonte</city>
    <neighborhood>Pampulha</neighborhood>
    <service>correios</service>
    <state>MG</state>
    <street>Av. Presidente Antônio Carlos, 6627</street>
</endereco>
```

```json
{
    "endereco": {
        "cep": "31270901",
        "city": "Belo Horizonte",
        "neighborhood": "Pampulha",
        "service": "correios",
        "state": "MG",
        "street": "Av. Presidente Antônio Carlos, 6627"
    }
}
```

**Principais diferenças:**
- **Verbosidade**: JSON é mais conciso → arquivos menores e transferências mais rápidas.
- **Sintaxe**: JSON usa pares chave-valor (como objeto literal JS); XML usa tags de abertura e fechamento.
- **Parsing**: JSON é analisado de forma mais simples e rápida, especialmente pelo JavaScript.

## JSON.stringify()

- Uso comum: troca de dados entre cliente e servidor web.
- Para enviar dados ao servidor, eles precisam estar em formato de string.
- `JSON.stringify()` converte qualquer dado JavaScript em uma string no formato JSON.

```js
const obj = {name: "John", age: 30, city: "New York"};
const myJSON = JSON.stringify(obj);
```

O caminho inverso (string JSON → objeto JS) é `JSON.parse()` — usado no exemplo de aula:

```js
const meuJson = JSON.stringify(meuObj);   // objeto -> JSON string
const outroObj = JSON.parse(meuJson);     // JSON string -> objeto
```

## JSON no mundo real — programação assíncrona

- No dia a dia usamos muitos dados externos, por exemplo recebidos de um endpoint de uma **API REST**. O sistema precisa esperar os dados "chegarem" antes de usá-los.
- **Programação assíncrona**: executar uma tarefa em "segundo plano". O código fica dividido em: coisas que rodam agora e coisas que vão rodar depois de algo acontecer.
- Para isso existem as **Promises** (promessas).

## async / await

- Introduzidos no ES2017; simplificam a programação assíncrona.
- Em uma função marcada como `async`, pode-se usar `await` antes de qualquer expressão que retorne uma Promise.
- A execução da função `async` fica **pausada até a Promise ser resolvida**.

## Exemplo prático (código de aula)

### Consulta de CEP — `codigo-exemplos/11.json/cep/js/script.js`

```js
const form = document.querySelector('form');

async function getAddress(){
    // constroi a url para consulta à API ViaCEP
    let url = `https://viacep.com.br/ws/${this.value}/json/`;

    // consulta a API ViaCEP
    const resposta = await fetch(url);

    // se a resposta não chegar ou o cep for inválido
    if (!resposta.ok){
        console.log('cep inválido');
    }
    else{
        // obtém o JSON da Promise
        let jsonCEP = await resposta.json();

        form.logradouro.value = jsonCEP.logradouro;
        form.complemento.value = jsonCEP.complemento;
        form.bairro.value = jsonCEP.bairro;
        form.cidade.value = jsonCEP.localidade;
        form.estado.value = jsonCEP.estado;
    }
}

const cep = document.querySelector('#cep');
cep.onchange = getAddress;
```

### Usuário aleatório — `codigo-exemplos/11.json/randomuser/js/script.js`

```js
function showUserData(usr){
    const divUsr = document.querySelector('#user');
    divUsr.innerHTML = '';

    const nomeCompleto = `${usr.name.first} ${usr.name.last}`;

    const img = document.createElement('img');
    img.src = usr.picture.large;
    img.style.width = '200px';

    const p = document.createElement('p');
    p.textContent = nomeCompleto;

    divUsr.appendChild(img);
    divUsr.appendChild(p);
}

async function getUserData(){
    let url = 'https://randomuser.me/api/?nat=br';

    const resposta = await fetch(url);

    if (!resposta.ok){
        console.log('Erro ao acessar usuário');
    }
    else{
        const jsonUser = await resposta.json();
        showUserData(jsonUser.results[0]);
    }
}

const botao = document.querySelector('#botao');
botao.onclick = getUserData;
```

**Padrão usado pelo professor:** `async function` → `await fetch(url)` → checar `resposta.ok` → `await resposta.json()` → montar o DOM com `createElement`/`appendChild` ou preencher campos.

## Bibliografia

Mesma da aula 02: javascript.info, MDN Web Docs, W3Schools; Duckett (2016), Flanagan (2013), Silva (2014).
