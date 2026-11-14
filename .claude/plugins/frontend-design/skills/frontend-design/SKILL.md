---
name: frontend-design
description: Guidance for distinctive, intentional visual design when building new UI or reshaping an existing one. Helps with aesthetic direction, typography, and making choices that don't read as templated defaults. Adaptada ao Projeto Final de CIWB (site de Breaking Bad): só HTML/CSS/JavaScript + Bootstrap e animações simples que o grupo consiga explicar ao professor.
license: Complete terms in LICENSE.txt (Apache 2.0). Modificado pelo grupo do Projeto Final de CIWB, que acrescentou a seção "Ressalvas do Projeto Final de CIWB".
---

# Frontend Design

## Ressalvas do Projeto Final de CIWB (prevalecem sobre o resto deste arquivo)

Este é o site do projeto final da disciplina de Construção de Interfaces Web (IFSP): um site multipágina de **Breaking Bad**, apresentado e explicado pelo grupo ao professor em 08/12/2026. Quem vai apresentar são estudantes, que precisam conseguir explicar cada linha de código. Por isso, onde o texto original pedir ousadia técnica, estas regras vencem. A ousadia vai para a direção visual (paleta, tipografia, composição, imagens), nunca para a complexidade do código.

Antes de escrever qualquer código, leia o `CLAUDE.md` e `contexto/especificacao/04-padroes-de-codigo.md`.

### Tecnologias permitidas (RNF04)

- Use só HTML5, CSS3, JavaScript puro e **Bootstrap 5.3 por CDN**.
- **Não use:**
  - frameworks e build: React, Vue, Tailwind, Sass, TypeScript, npm, bundlers;
  - bibliotecas de animação: GSAP, Anime.js, AOS, Animate.css, Lottie;
  - `import`/`export` (módulos).
- **Fontes:** Google Fonts por `<link>` é permitido, sempre com uma fonte de reserva.
- **Arquivos separados (RNF03):** estilos em `src/css/style.css` e scripts em `src/js/*.js`. Nada de `style="..."` ou `<script>` com código dentro do HTML.
- **Bootstrap primeiro:** navbar, grid, cards, carousel e modal vêm do Bootstrap. Personalize por cima, no `style.css`, com classes próprias ou variáveis CSS (`--bs-...`), sem reescrever o Bootstrap.

### JavaScript: só o que foi ensinado

- **O que pode usar:**
  - os recursos das aulas em `contexto/slides/`: `fetch` + `async/await`, `localStorage`, `JSON`;
  - DOM: `querySelector`, `getElementById`, `createElement`, `appendChild`, `textContent`, `innerHTML = ''`, `element.style`;
  - `addEventListener`, `for`, `forEach`, `push`, `includes`, `toLowerCase`, `trim` e template strings.
- **O que evitar:** `filter`, `map`, `reduce`, classes JS, *closures* elaboradas, `requestAnimationFrame` e *debounce* feito à mão.
- **`IntersectionObserver`:** só para as animações de rolagem (ver abaixo), sempre na forma padrão de "observar e adicionar uma classe".
- **Fora das aulas, mas aceitável:** `classList.add`/`classList.remove`/`classList.toggle` (uma linha, fácil de explicar). Use só para ligar ou desligar uma animação de CSS e comente no código que não foi visto em aula.
- **Funções curtas, nomes em português:** `montarCarrossel`, `mostrarDetalhes`. Comente o que cada uma faz.

### Animações: simples e explicáveis

Regra de ouro: cada animação precisa ser explicada ao professor em **uma ou duas frases**, olhando para no máximo umas 10 linhas de CSS.

- **Permitido:**
  - `transition` em `:hover` e `:focus-visible`, mexendo em `transform` (`translateY`, `scale`), `opacity`, `box-shadow`, `color` ou `background-color`. Exemplo: o card do personagem sobe 4px ao passar o mouse;
  - `@keyframes` curtos (até uns 600 ms), com dois ou três passos, de `opacity` e `transform`. Exemplos: um *fade-in* do título da página inicial; o aviso "Carregando…" pulsando;
  - as animações que o Bootstrap já traz: o deslizar do carousel (inclusive `carousel-fade`), o *fade* do modal e o recolher da navbar. Elas contam como animação do site e não exigem código nosso;
  - disparo por JS só para trocar uma classe (por exemplo, adicionar `.aparecer` aos cards depois de montar a lista);
  - **animações de rolagem** (liberadas pelo usuário em 14/11/2026), em uma destas duas formas simples:
    1. **Revelar ao rolar** (a preferida): um único `IntersectionObserver`, num arquivo compartilhado (ex.: `src/js/rolagem.js`), que adiciona a classe `.visivel` quando o elemento entra na tela. O CSS faz a `transition` de `opacity` e `transform` (ex.: sobe 20px enquanto aparece). São cerca de 10 linhas de JS, comentadas em português e marcadas como não vistas em aula. Para a lista de uma página de recurso, observe os cards depois de montá-los;
    2. **CSS puro com `animation-timeline: view()`**, dentro de `@supports (animation-timeline: view())`, para que o elemento apareça normalmente nos navegadores sem suporte;
  - um *parallax* leve só com CSS (`background-attachment: fixed` numa faixa com imagem), sem JS.
- **Proibido:**
  - canvas, WebGL e partículas;
  - `addEventListener('scroll', ...)` calculando posições em JS e *parallax* feito com JS;
  - animação de `path` em SVG, efeito de digitação feito com JS, física ou molas;
  - `setInterval` para animar e animações em sequência com `animation-delay` calculado em JS.

  Num efeito escalonado (um card depois do outro), use no máximo algumas classes fixas no CSS (`.atraso-1`, `.atraso-2`…).
- **Quantidade:**
  - um momento de destaque na página inicial (por exemplo, a entrada do carrossel ou do título);
  - a revelação ao rolar pode aparecer nas seções da página inicial e nos cards das listas, sempre com o mesmo efeito em todo o site, sem uma animação diferente por seção;
  - nas páginas de recurso, as outras animações são respostas a ações (hover no card, abrir o modal).
- **Nada pode ficar invisível esperando a animação:** se o JS falhar ou o usuário pedir menos movimento, o conteúdo aparece normalmente. Esconda o elemento só depois que o JS adicionar uma classe que marca que a animação está ativa (ex.: `.js-rolagem` no `body`).
- **Sempre respeite `prefers-reduced-motion`:** um bloco `@media (prefers-reduced-motion: reduce)` que desliga as animações próprias.
- **Comente cada animação no CSS em português:** o que ela faz e por quê. Exemplo: `/* Card sobe um pouco no hover para mostrar que é clicável */`.
- **Ao entregar o código,** liste as animações criadas, cada uma com uma frase de "como explicar ao professor".

### Acessibilidade e conteúdo (RNF01, RNF02)

- HTML semântico (`header`, `nav`, `main`, `footer`), `label` nos campos, `alt` em toda imagem (inclusive no carrossel) e foco visível no teclado.
- Responsivo com o grid do Bootstrap, do celular ao desktop.
- Textos da interface em **português do Brasil**. Os dados vêm da API própria (`https://breaking-bad-api-ciwb.vercel.app/api`) e não ficam fixos no HTML.
- Identidade de site de fã de Breaking Bad: inspire-se no universo da série (deserto do Novo México, laboratório, tabela periódica, o azul do cristal), sem copiar o logotipo oficial.
- Os textos que vêm da API entram com `textContent`, e não com `innerHTML`.

---

*Texto original do plugin a seguir (Anthropic, Apache 2.0). Onde ele conflitar com as ressalvas acima, valem as ressalvas.*

Approach this as the design lead at a design studio known for giving every client a distinct visual identity that is not mistaken for anyone else's. This client has already rejected proposals that felt cliché or templated, and is paying for a distinctive point of view: make deliberate, opinionated choices about palette, typography, and layout that are specific to this brief, and take aesthetic risk if justified.

## Ground your designs in the subject matter

If the brief does not identify what the product or subject matter is, identify it yourself before designing, and confirm with the client. You can come up with one concrete subject, the design's audience, and the design's primary job, as a proposal. If there's any information in your memory about the client's preferences or context about what they're building, use that as a hint. The subject's industry, subject matter, materials, and vernacular are where distinctive visual choices come from — a design for a toy for girls aged 8–11 will be very aesthetically different from a dashboard for financial analysts. Build with the brief's real content and subject matter throughout.

## Design principles

For web designs, the hero is the first thing viewers will see. Open with the most characteristic thing in the subject's world, in the form that is most appropriate: a headline, an image, an animation, a live demo, an interactive moment, or other treatments. Be deliberate with your choice: a big number with a small label, supporting stats, and a gradient accent is the default treatment, so only use it if that's truly the best option.

Typography carries the personality of the page. You don't need a different typeface for display or headline text and body content: use one family or two, and if two, make them clearly distinct.

Choose your typefaces deliberately, not the default families you would reach for on any other project, and set a clear type scale following the default guidance of The Elements of Typographic Style with intentional weights, widths, and spacing. When type is used as a headline or visual element, use the type treatment itself as an active part of the design, not a neutral delivery vehicle for the content.

Default to line lengths of less than 80 characters. Serif typefaces can have slightly longer line lengths; give serif body text slightly more line-height than a sans-serif.

Avoid these default typographic treatments; they are the commonest tells of a generated page:
- Accenting just a single word or phrase in a headline, like putting one word in italic/bold or a different color.
- Using all caps for labels.
- Adding unnecessary typographic labels above content.

Visual structure is information. Structural devices like outlines, borders, numbering, eyebrows, dividers, labels, etc., encode useful information about the content rather than decorate it. Many generic designs use numbered markers (01 / 02 / 03), but that's only appropriate if the content actually is a sequence — like a stepped process or a timeline. Before adding numbered markers, check the content really is a sequence.

Use non-user-triggered motion sparingly and deliberately, only to draw attention. A single orchestrated moment — one page-load sequence or one reveal — lands better than scattered effects; fade-and-slide-up entrances on each section and hover transitions on every card are the generic default and read as AI-generated. Motion that answers a person's action (opening, expanding, confirming) is welcome when it shows what changed.

Consider written content carefully. Often a design brief may not contain real content, and it's up to you to come up with copy and placeholder content. Copy can make a design feel as templated as the design itself. See the below section on writing for more guidance.

## Process: plan, review against the brief, build, critique

For calibration, AI-generated design right now clusters around some traits:
1. a warm cream background (near #F4F1EA) with a high-contrast serif display and a terracotta or warm-clay accent (often near #D97757 — Anthropic's own Claude-interaction accent, so on a user's brief it reads as a tell);
2. a near-black background with a single bright acid-green or vermilion accent;
3. a broadsheet-style layout with hairline rules, zero border-radius, and dense newspaper-like columns;
4. the SaaS-card kit: content chopped into identical rounded cards, one border-radius on everything regardless of hierarchy, the same soft grey shadow (rgba(0,0,0,.1)) under each, and gradient washes as decoration;
5. template chrome that appears whatever the subject: a tracked-out ALL-CAPS eyebrow label above every heading; meta strings joined with middle dots ('A · B · C'); labels built as 'WORD — fragment' with a spaced em dash; tinted near-black (#0B0B0B, #111) standing in for black; a monospace face for small data labels; a '→' appended to link and button text.

All traits are legitimate for some briefs, but they are defaults rather than choices, and they appear regardless of subject. Where the brief pins down a visual direction, follow it exactly — the brief's own words always win, including when it asks for one of these looks. Where it leaves an axis free, don't spend that freedom on one of these defaults. As with a hired human designer, there's often a careful balance between doing what you're good at and taking each project as a chance to experiment and learn.

Work in two passes. First, brainstorm a short design plan based on the client's design brief: create a compact token system with color, type, layout, and principles.
- Color: describe the core base palette as 4–6 named hex values.
- Type: the typefaces and their roles.
- Layout: a layout concept, using one-sentence prose descriptions and ASCII wireframes to ideate and compare. Include alignment guidance; should the content be left aligned, center aligned, justified?
- Principles: the high-level guidance for what makes this page unique.

Then review that plan against the brief before building: if any part of it reads like the generic default you would produce for any similar page (work through a similar prompt to see if you arrive somewhere similar) rather than a choice made for this specific brief — revise that part, say what you changed and why. Only after you've confirmed the relative uniqueness of your design plan should you start to write the code, following the revised plan.

When writing the code, be careful of structuring your CSS selector specificities. It's easy to generate CSS classes that cancel each other out (especially with a type-based selector like .section and an element-based selector like .cta). This can happen often with padding/margin between sections.

## Restraint and self-critique

Spend your boldness in one place. Let one element be the memorable thing, keep everything around it quiet and disciplined, and cut any decoration that does not serve the brief. Build to a quality floor without announcing it: responsive down to mobile, visible keyboard focus, reduced motion respected, visually accessible, harmonious color palettes. Critique your own work as you build, taking screenshots to review if your environment supports it — a picture is worth 1000 tokens. Consider Chanel's advice: before leaving the house, take a look in the mirror and remove one accessory. Human creatives have memory and always try to do something new, so if you have a space to quickly jot down notes about what you've tried, it can help you in future passes.

## More on writing in design

Words appear in a design for one reason: to make it easier to understand and use. They are design content, not decoration. Bring the same intentionality and minimalism to copywriting that you would bring to spacing and color. Before writing anything, ask what the design needs to say, and how it can best be said to help the person navigate the experience.

Write from the end user's perspective. Name things by what users will understand in simple language, not by how the system is built. A user manages notifications, not webhook config. Describe what something is or does in plain terms rather than selling it. Being specific and legible to new users is always better than being clever.

Use active voice as default. A CTA says exactly what happens when it is used: "Save changes," not "Submit." An action keeps the same name through the whole flow, so the button that says "Publish" produces a toast that says "Published." The vocabulary of an interface is the signposting for someone navigating the product. Cohesion and consistency are how people learn their way around.

Treat failure and emptiness as moments for direction, not mood. Explain what went wrong and how to fix it, in the interface's voice rather than a person's. Errors don't apologize, and they are never vague about what happened. An empty screen is an invitation to act.

Keep the tone conversational: plain verbs, sentence case, no filler, with tone matched to the brand and the audience. Let each written element do exactly one job.
