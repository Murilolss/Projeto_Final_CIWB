# Aula 11 — DOM (Document Object Model)

> Fonte: `contexto/pdfs/11. DOM.pdf` — Prof. José Arnaldo Mascagni de Holanda (IFSP Araraquara)

## JavaScript HTML DOM

Quando a página é carregada, o navegador cria um **Modelo de Objeto de Documento (DOM)**, construído como uma árvore de objetos:

```
Document
└── Root element: <html>
    ├── Element: <head>
    │   └── Element: <title>
    │       └── Text: "My title"
    └── Element: <body>
        ├── Element: <a>  (Attribute: "href")
        │   └── Text: "My link"
        └── Element: <h1>
            └── Text: "My header"
```

## O que é o HTML DOM?

Um modelo de objeto e interface de programação padrão para HTML. Define:
- Os elementos HTML como **objetos**;
- As **propriedades** de todos os elementos;
- Os **métodos** para acessar todos os elementos;
- Os **eventos** de todos os elementos.

Ou seja: é o padrão que define como **obter, alterar, adicionar ou excluir** elementos HTML.

## Métodos e propriedades

- O DOM pode ser acessado com JavaScript.
- Todos os elementos HTML são objetos.
- **Propriedade**: valor que se obtém ou define (ex.: alterar o conteúdo de um elemento).
- **Método**: ação que se executa (ex.: adicionar ou excluir um elemento).

## Encontrando elementos

| Método | Descrição |
|---|---|
| `document.getElementById(id)` | Encontra um elemento pelo **id** |
| `document.getElementsByTagName(nome)` | Encontra elementos pelo nome da **tag** |
| `document.getElementsByClassName(nome)` | Encontra elementos pelo nome da **classe** |
| `document.querySelector(seletor)` | Encontra elementos pelo **seletor CSS** |

## Mudando elementos

| Propriedade / Método | Descrição |
|---|---|
| `element.innerHTML = novo conteúdo` | Altera o HTML interno do elemento |
| `element.atributo = novo valor` | Altera o valor de um atributo |
| `element.style.propriedade = novo estilo` | Altera o estilo do elemento |
| `element.setAttribute(atributo, valor)` | Altera o valor de um atributo |

## Adicionando e removendo elementos

| Método | Descrição |
|---|---|
| `document.createElement(element)` | Cria um elemento HTML |
| `document.removeChild(element)` | Remove um elemento HTML |
| `document.appendChild(element)` | Adiciona um elemento HTML |
| `document.replaceChild(new, old)` | Substitui um elemento HTML |

## Nós do DOM

### Criando novos elementos

Primeiro cria-se o elemento (nó), depois ele é anexado a um elemento existente:

```html
<div id="div1">
    <p id="p1">Este é um parágrafo.</p>
    <p id="p2">Este é outro parágrafo.</p>
</div>

<script>
    const para = document.createElement("p");
    const node = document.createTextNode("Este é novo.");
    para.appendChild(node);

    const element = document.getElementById("div1");
    element.appendChild(para);
</script>
```

### insertBefore()

`appendChild()` adiciona o novo elemento como **último filho**. Para inserir antes de outro elemento:

```html
<script>
    const element = document.getElementById("div1");
    const child = document.getElementById("p1");
    element.insertBefore(para, child);
</script>
```

### Removendo elementos — remove()

```html
<script>
    const elmnt = document.getElementById("p1");
    elmnt.remove();
</script>
```

`remove()` não funciona em navegadores mais antigos.

### Removendo um nó filho — removeChild()

Para navegadores sem `remove()`, localize o nó pai:

```html
<script>
    const parent = document.getElementById("div1");
    const child = document.getElementById("p1");
    parent.removeChild(child);
</script>
```

### Substituindo elementos — replaceChild()

```html
<script>
    const para = document.createElement("p");
    const node = document.createTextNode("Este é novo.");
    para.appendChild(node);

    const parent = document.getElementById("div1");
    const child = document.getElementById("p1");
    parent.replaceChild(para, child);
</script>
```

## HTMLCollection

`getElementsByTagName()` retorna uma **HTMLCollection**, uma lista de elementos semelhante a um array.

```js
const myCollection = document.getElementsByTagName("p");
for (let i = 0; i < myCollection.length; i++) {
    myCollection[i].style.color = "red";
}
```

> **Uma HTMLCollection NÃO é um array!** Dá para percorrer e acessar por índice, mas **não** dá para usar métodos de array como `valueOf()`, `pop()`, `push()` ou `join()`.

## Bibliografia

Mesma da aula 02: javascript.info, MDN Web Docs, W3Schools; Duckett (2016), Flanagan (2013), Silva (2014).
