# Aula 14 — Validação de Formulários

> Fonte: `contexto/pdfs/14. Validação de Formulários.pdf` — Prof. José Arnaldo Mascagni de Holanda (IFSP Araraquara)

## Por que validar?

- **Experiência do usuário (UX)**: evita frustração, abandono de carrinho, cadastros incompletos.
- **Integridade dos dados**: "Garbage in, garbage out" — dados ruins (ex.: CPF no campo de telefone) poluem o banco.
- **Segurança**: prevenir entradas maliciosas (o foco principal disso é no backend).

## Cliente vs. Servidor

- **Validação no cliente** (navegador, JavaScript): feedback rápido, evita viagem desnecessária ao servidor. É uma **barreira de conveniência**.
- **Validação no servidor** (Node.js, Java, C#, PHP): segurança e integridade dos dados. É a **barreira de segurança** — a validação real.
- **NUNCA CONFIE NOS DADOS VINDOS DO CLIENTE!**

## Validação com HTML5

O navegador faz o trabalho pesado com atributos:
- `required`: o campo não pode ficar vazio.
- `type="email"`: o valor deve ser um e-mail válido.
- `type="number"`: deve ser número (aceita `min`, `max`, `step`).
- `minlength` / `maxlength`: mínimo/máximo de caracteres.
- `pattern="[a-z]{4,8}"`: o valor deve bater com uma expressão regular.

```html
<!-- Exemplo de código -->
<form>
  <label>Email:</label>
  <input type="email" required>

  <label>Senha (min. 8 caracteres):</label>
  <input type="password" required minlength="8">

  <label>Username (só letras minúsculas):</label>
  <input type="text" pattern="[a-z]+">

  <button type="submit">Cadastrar</button>
</form>
```

### Problemas da validação só com HTML5

- As mensagens padrão ("bolhas") são genéricas.
- Não são customizáveis (ex.: "Preencha este campo").
- O visual muda de navegador para navegador.
- Não dá para controlar quando a validação ocorre (geralmente só no submit).

## Constraint Validation API

API JavaScript que dá controle sobre a validação HTML5. Os atributos (`required`, `pattern`…) continuam sendo a base, mas o JS controla mensagens e comportamento.

- Adicione `novalidate` ao formulário: isso desliga as "bolhas" padrão e o controle passa para o JS.

```html
<!-- O 'novalidate' é a chave! -->
<form id="meu-form" novalidate>
  ...
</form>
```

## Verificando a validade

- `form.checkValidity()`: `true` se o formulário inteiro for válido (útil no submit).
- `input.checkValidity()`: `true` se um campo for válido (útil no `blur` ou `input`).
- `input.validity`: objeto que descreve **por que** o campo é inválido.

```js
const form = document.getElementById('meu-form');

form.addEventListener('submit', (event) => {
    // Impede o envio padrão
    event.preventDefault();

    if (form.checkValidity()) {
        console.log('Formulário VÁLIDO! Enviando...');
        // form.submit(); // aqui enviaria de verdade
    } else {
        console.log('Formulário INVÁLIDO. Mostre os erros.');
        // Chamar a função que mostra os erros
    }
});
```

## O objeto validity

Todo elemento de formulário (`input`, `textarea`, `select`) tem `.validity`, um objeto `ValidityState` com flags booleanas:

| Propriedade | `true` quando… |
|---|---|
| `valueMissing` | campo `required` está vazio |
| `typeMismatch` | `type="email"` ou `type="url"` não bate |
| `patternMismatch` | o `pattern` não bate |
| `tooShort` | valor menor que `minlength` |
| `rangeOverflow` / `rangeUnderflow` | valor acima/abaixo de `max`/`min` |
| `valid` | todas as outras são falsas |

## Customizando as mensagens

- `input.setCustomValidity(mensagem)`:
  - String vazia `""` → campo **válido** (sem erro customizado).
  - Qualquer outra string → campo **inválido**, com essa mensagem de erro.
- `input.validationMessage`: lê a mensagem de erro atual (padrão ou customizada).

### Juntando tudo

```html
<input type="email" id="email" required> <span id="email-error-span" class="error"></span>
```

```js
const emailInput = document.getElementById('email');
const emailError = document.getElementById('email-error-span');

emailInput.addEventListener('input', () => {
  // Limpa erros antigos enquanto o usuário digita
  emailError.textContent = '';
  emailInput.setCustomValidity('');

  if (emailInput.validity.typeMismatch) {
    const errorMsg = 'Por favor, insira um formato de e-mail válido.';
    emailInput.setCustomValidity(errorMsg);
    emailError.textContent = errorMsg; // Mostra no nosso span
  }

  if (emailInput.validity.valueMissing) {
    const errorMsg = 'O campo de e-mail não pode estar vazio.';
    emailInput.setCustomValidity(errorMsg);
    emailError.textContent = errorMsg;
  }
});
```

## Validação 100% manual

Quando o HTML5 não tem atributo para a regra (ex.: "Confirmar senha" igual a "Senha"), use lógica JS + `setCustomValidity()`:

```js
const senha = document.getElementById('senha');
const confirmaSenha = document.getElementById('confirma-senha');

confirmaSenha.addEventListener('input', () => {
  if (senha.value !== confirmaSenha.value) {
    confirmaSenha.setCustomValidity('As senhas não conferem!');
  } else {
    // CAMPO VÁLIDO! Limpe a mensagem.
    confirmaSenha.setCustomValidity('');
  }
});
```

## Resumo

- Valide no cliente **e** no servidor. Sempre.
- Use HTML5 primeiro (`required`, `type`, `pattern`).
- Use a Constraint Validation API para assumir o controle:
  - `novalidate` no `<form>`;
  - `event.preventDefault()` e `form.checkValidity()` no submit;
  - `input.validity` para saber o tipo de erro;
  - `setCustomValidity()` para mensagens personalizadas.
- Dê feedback claro e imediato: use os eventos `input` ou `blur`, sem esperar o submit.

## Bibliografia

Mesma da aula 02: javascript.info, MDN Web Docs, W3Schools; Duckett (2016), Flanagan (2013), Silva (2014).
