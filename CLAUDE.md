# Projeto Final — CIWB (Construção de Interfaces Web)

Repositório do projeto final da disciplina de CIWB (IFSP). O enunciado está em `contexto/pdfs/Projeto Prático 2026.pdf`.

## Estrutura do repositório

- `.claude/` — skills criadas ou baixadas a pedido do usuário.
- `contexto/` — material de apoio (não é código do projeto):
  - `codigo-exemplos/` — códigos de exemplo feitos pelo professor em aula. Use como referência de estilo e do que já foi ensinado.
  - `especificacao/` — **especificação do site para consultar durante o desenvolvimento** (ver seção "Especificação do site").
  - `memory/` — memórias das sessões do Claude **deste projeto** (ver seção "Memória das sessões").
  - `pesquisa-api/` — pesquisa e dados brutos (Breaking Bad Wiki) para a API própria de Breaking Bad, com os scripts de coleta.
  - `pdfs/` — slides das aulas em PDF e o enunciado do projeto.
  - `slides/` — versões em `.md` dos slides (um arquivo por aula), geradas a partir de `pdfs/`, com os códigos dos slides transcritos. Consulte sempre que precisar do conteúdo das aulas:
    - `00-projeto-pratico-2026.md` — **enunciado do projeto** (requisitos RF/RN/RNF, prazo 08/12/2026)
    - `02-fundamentos-do-javascript.md`, `03-tipos-de-dados.md`, `04-estruturas-condicionais-e-de-repeticao.md`, `05-funcoes.md`, `06-strings.md`, `07-arrays.md`, `08-objetos.md`, `09-objeto-date.md`, `10-eventos.md`, `11-dom.md`
    - `12-json.md` — JSON, `fetch` + `async/await` (inclui os exemplos de aula de `codigo-exemplos/11.json`)
    - `13-cookies-e-localstorage.md` — localStorage (base do cache exigido no projeto)
    - `14-validacao-de-formularios.md`, `15-expressoes-regulares.md`
    - Não há aula 01 (não é necessária).
- `src/` — código-fonte do projeto.
- `CLAUDE.md` — configurações do projeto e do Claude para este repositório.
- `README.md` — README geral do projeto.

## Especificação do site

Antes de implementar qualquer parte do site, consulte `contexto/especificacao/`:

- `README.md` — índice e **decisões em aberto** (API, formato da configuração, imagens).
- `01-requisitos.md` — checklist de requisitos (enunciado + pedidos do usuário). Marque `[x]` o que for concluído.
- `02-paginas-e-estrutura.md` — mapa de páginas, layout comum, carrossel da página inicial, pastas de `src/`.
- `03-configuracao.md` — arquivo de configuração (link da API e imagens do carrossel).
- `04-padroes-de-codigo.md` — como implementar API, cache, busca, modal e carrossel com o que foi visto em aula.
- `05-api-breaking-bad.md` — modelagem da API própria de Breaking Bad (a API escolhida).

Resumo do que o usuário pediu além do enunciado:

- A página inicial (`index.html`) tem um **carrossel de imagens** (Bootstrap).
- O **link da API** e as **imagens do carrossel** ficam em `src/js/config.json`, lido com `fetch`, e nunca fixos no código. Foi escolhido no lugar de um `.env`, que o navegador não lê sem ferramentas de build. O site precisa rodar pelo Live Server.

Mantenha essas páginas atualizadas quando uma decisão for tomada ou um requisito mudar.

## Memória das sessões

- Toda memória referente a ESTE projeto fica em `contexto/memory/`, e não no sistema de memória global do Claude.
- **No início de cada sessão:** leia os arquivos de `contexto/memory/`, começando pelo mais recente, para retomar o contexto.
- **Ao longo e ao final da sessão:** registre o que foi feito, as decisões tomadas, as pendências e as preferências do usuário.
- Formato: um arquivo por sessão, `contexto/memory/AAAA-MM-DD-sessao-NN.md` (NN = número da sessão no dia). As seções são: Resumo, Feito, Decisões, Pendências / próximos passos.
- O usuário salva a memória com a skill `/salvar-memoria` (`.claude/skills/salvar-memoria/SKILL.md`).

## Skills do projeto

- `/salvar-memoria [observação]` — cria ou atualiza o registro da sessão atual em `contexto/memory/`.
- `/atualizar-branch [dev | main | tudo]` — leva os commits de `bb/<integrante>` para a `dev` (padrão), da `dev` para a `main`, ou faz os dois passos (`tudo`). Usa só merge fast-forward + push, sem criar commit (`.claude/skills/atualizar-branch/SKILL.md`).

## Plugins do projeto

- `.claude/plugins/` é um marketplace local (`ciwb-local`), declarado e ativado em `.claude/settings.json`.
- `frontend-design@ciwb-local` — cópia do `frontend-design` oficial da Anthropic com **ressalvas do projeto** no início do `SKILL.md`:
  - só HTML/CSS/JavaScript + Bootstrap 5.3;
  - JavaScript limitado ao visto em aula;
  - animações simples em CSS, que o grupo consiga explicar ao professor.
  
  Use esse plugin em todo trabalho visual do site. Não instale a versão `@claude-plugins-official`. Detalhes em `.claude/plugins/frontend-design/README.md`.

## Diretrizes

- Baseie a implementação no que foi ensinado nas aulas (`contexto/slides/` e `contexto/codigo-exemplos/`).
- Todo o código do projeto fica em `src/`.

## Git e commits

- **O Claude nunca cria commit:** nem `git commit`, nem merge que gere commit de merge, nem nada que reescreva o histórico (`rebase`, `reset`, `push --force`). Vale mesmo que pareça o momento certo. O usuário faz os commits manualmente, e o histórico fica só com commits dele, sem co-autor.
- Ao terminar uma etapa que mereça commit, o Claude **apenas sugere a mensagem do commit** (em português, curta e no imperativo, ex.: `Adiciona página de personagens com busca e modal`) e, se ajudar, a lista de arquivos a incluir.
- **Merge fast-forward e push são permitidos** (decidido pelo usuário em 14/11/2026), sempre com `git merge --ff-only` (não cria commit) e `git push` sem `--force`. O jeito padrão é a skill `/atualizar-branch`. Se o fast-forward falhar, o Claude para e explica; quem resolve é o usuário.
- Comandos só de leitura (`git status`, `git diff`, `git log`, `git fetch`) continuam permitidos.
- Criar ou trocar de branch (`git branch`, `git switch`) é permitido quando o usuário pedir.

### Branches

- `main` — produção (versão entregue/apresentada).
- `dev` — integração do trabalho dos integrantes.
- `bb/<integrante>` — uma branch por integrante, criada a partir de `dev` (ex.: `bb/murilo`). Por enquanto só existe a do Murilo; as dos outros integrantes serão criadas quando o usuário pedir.
- Fluxo: trabalho em `bb/<integrante>` → merge em `dev` → quando estável, merge de `dev` em `main`.
