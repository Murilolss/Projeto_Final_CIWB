# frontend-design (versão do Projeto Final de CIWB)

Cópia do plugin oficial `frontend-design@claude-plugins-official` (versão 1.1.1, Anthropic, licença Apache 2.0, ver `LICENSE`), com **ressalvas para este projeto** no início de `skills/frontend-design/SKILL.md`.

## O que mudou em relação ao original

- **Única alteração:** a seção "Ressalvas do Projeto Final de CIWB", no começo do `SKILL.md`, e a descrição no cabeçalho do arquivo. O resto do texto é o original.
- **Precedência:** as ressalvas valem por cima do texto original.
- **Tecnologias:** só HTML5, CSS3, JavaScript puro e Bootstrap 5.3 por CDN, como pede o enunciado (RNF04).
- **Código:** JavaScript limitado ao que foi visto em aula (`contexto/slides/`).
- **Animações:** simples, feitas com CSS (`transition` e `@keyframes` curtos) e fáceis de explicar ao professor.
  - Animações de rolagem são permitidas: revelar ao rolar com um `IntersectionObserver` que só adiciona uma classe, ou com `animation-timeline: view()` em CSS.
  - Nada de bibliotecas de animação, canvas, `requestAnimationFrame` ou cálculos de rolagem em JS.

## Como está instalado

- `.claude/plugins/` é um marketplace local chamado `ciwb-local` (`.claude-plugin/marketplace.json`).
- O `.claude/settings.json` do projeto declara esse marketplace e ativa `frontend-design@ciwb-local`. Quem clonar o repositório e confiar na pasta recebe o plugin.

Comandos usados:

```
claude plugin marketplace add ./.claude/plugins --scope project
claude plugin install frontend-design@ciwb-local --scope project
```

O `path` do marketplace no `.claude/settings.json` foi trocado para o caminho relativo `./.claude/plugins`, para funcionar em qualquer clone. Se num clone novo o plugin não aparecer em `claude plugin list`, rode os dois comandos acima. Eles regravam o caminho como absoluto no `settings.json`; nesse caso, não commite essa alteração.

**Não instale também o `frontend-design@claude-plugins-official`.** As duas versões teriam a mesma skill, e a original não tem as ressalvas.

Para mudar as ressalvas:

1. Edite o `SKILL.md`.
2. Suba a versão nos dois arquivos de manifesto (`.claude-plugin/plugin.json` e `../.claude-plugin/marketplace.json`).
3. Rode `claude plugin marketplace update ciwb-local` e `claude plugin update frontend-design@ciwb-local --scope project`.
