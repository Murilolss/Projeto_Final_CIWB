# Aula 10 — Eventos

> Fonte: `contexto/pdfs/10. Eventos.pdf` — Prof. José Arnaldo Mascagni de Holanda (IFSP Araraquara)

## Conceito

Eventos são ações ou ocorrências no sistema que o JavaScript pode detectar e responder. Exemplos:
- Clique em um botão (`onclick`).
- Mouse sobre um elemento (`onmouseover`).
- Tecla pressionada (`onkeydown`).
- Mudança no valor de um campo (`onchange`).

Um evento HTML pode ser algo que o **navegador** faz ou que o **usuário** faz:
- A página terminou de carregar;
- Um campo de entrada foi alterado;
- Um botão foi clicado.

O JavaScript permite executar código quando os eventos são detectados, e o HTML permite adicionar atributos manipuladores de eventos aos elementos.

## Associando eventos a elementos HTML

### 1. Atributos HTML

Código JavaScript direto no atributo do elemento:

```html
<button onclick="alert('Botão clicado!')">Clique-me</button>
```

### 2. Métodos JavaScript — `addEventListener`

```js
document.getElementById("meuBotao").addEventListener("click", function() {
  alert('Botão clicado!');
});
```

**Vantagens do `addEventListener`:**
- Permite múltiplos manipuladores para o mesmo evento.
- Oferece controle sobre a fase de propagação do evento.

## Tipos comuns de eventos

| Categoria | Evento | Quando ocorre |
|---|---|---|
| Mouse | `onclick` | Clique do mouse |
| Mouse | `onmouseover` | Mouse sobre o elemento |
| Mouse | `onmouseout` | Mouse sai do elemento |
| Teclado | `onkeydown` | Tecla pressionada |
| Teclado | `onkeyup` | Tecla liberada |
| Formulário | `onchange` | Valor de um campo mudou |
| Formulário | `onsubmit` | Formulário enviado |
| Carregamento | `onload` | Página ou imagem carregada |
| Carregamento | `onunload` | Página ou janela fechada |

> Com `addEventListener`, usa-se o nome sem o prefixo `on`: `"click"`, `"mouseover"`, `"keydown"`, `"change"`, `"submit"`, `"load"`…

## Objeto de evento

Contém informações sobre o evento ocorrido. Propriedades comuns:
- `event.target`: elemento que disparou o evento.
- `event.type`: tipo do evento.
- `event.currentTarget`: elemento ao qual o manipulador está anexado.

```js
document.getElementById("meuBotao").addEventListener("click", function(event) {
  console.log(event.target);
});
```

## Exercício proposto

Crie uma página interativa utilizando eventos:
- Um botão que, ao ser clicado, exibe a data e hora atual.
- Alterar a cor de fundo da página ao passar o mouse sobre um parágrafo.
- Mostrar um alerta quando uma tecla for pressionada.

## Bibliografia

Mesma da aula 02: javascript.info, MDN Web Docs, W3Schools; Duckett (2016), Flanagan (2013), Silva (2014).
