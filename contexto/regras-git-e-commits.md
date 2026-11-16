# Regras de Git e commits para o Claude Code

Este arquivo explica como eu configurei o Claude Code para lidar com commits e branches, e traz o texto pronto para você colocar na sua configuração.

## A ideia

- **O Claude nunca faz commit.** Quem commita sou eu, na mão. Assim o histórico só tem commits meus, sem a linha `Co-Authored-By: Claude`.
- Quando uma etapa termina, o Claude **só sugere a mensagem do commit** e os arquivos a incluir.
- O Claude pode **levar commits de uma branch para outra**, mas só por *fast-forward* (`git merge --ff-only`), que apenas avança o ponteiro da branch e não cria commit. Depois ele pode dar `git push`, mas nunca com `--force`.
- Se o fast-forward não der certo, o Claude para e explica. Ele não resolve sozinho.

## Como configurar

1. Abra (ou crie) o arquivo `CLAUDE.md`:
   - na raiz do projeto, para valer só naquele projeto; ou
   - em `~/.claude/CLAUDE.md` (no Windows, `C:\Users\<seu-usuário>\.claude\CLAUDE.md`), para valer em todos os projetos.
2. Cole o bloco da próxima seção no arquivo.
3. Troque `bb/<integrante>` pelo nome da sua branch, se for usar outro padrão.
4. Abra uma sessão nova do Claude Code. O `CLAUDE.md` é lido no início de cada sessão.

Se estiver no mesmo repositório do projeto, essas regras já estão no `CLAUDE.md` da raiz e valem assim que você clonar.

## Texto para colar no `CLAUDE.md`

```markdown
## Git e commits

- **O Claude nunca cria commit:** nem `git commit`, nem merge que gere commit de merge, nem nada que reescreva o histórico (`rebase`, `reset`, `push --force`). Vale mesmo que pareça o momento certo. O usuário faz os commits manualmente, e o histórico fica só com commits dele, sem co-autor.
- Ao terminar uma etapa que mereça commit, o Claude **apenas sugere a mensagem do commit** (em português, curta e no imperativo, ex.: `Adiciona página de personagens com busca e modal`) e, se ajudar, a lista de arquivos a incluir.
- **Merge fast-forward e push são permitidos**, sempre com `git merge --ff-only` (não cria commit) e `git push` sem `--force`. Se o fast-forward falhar, o Claude para e explica; quem resolve é o usuário.
- Comandos só de leitura (`git status`, `git diff`, `git log`, `git fetch`) continuam permitidos.
- Criar ou trocar de branch (`git branch`, `git switch`) é permitido quando o usuário pedir.

### Branches

- `main` — produção (versão entregue/apresentada).
- `dev` — integração do trabalho dos integrantes.
- `bb/<integrante>` — uma branch por integrante, criada a partir de `dev` (ex.: `bb/murilo`).
- Fluxo: trabalho em `bb/<integrante>` → merge em `dev` → quando estável, merge de `dev` em `main`.
```

## Fluxo do dia a dia

1. Você trabalha na sua branch (`bb/<integrante>`) e o Claude edita os arquivos.
2. Ao fim de uma etapa, o Claude sugere algo como:
   > Sugestão de commit: `Adiciona busca por nome na página de personagens`
3. Você revisa e commita:
   ```bash
   git add <arquivos>
   git commit -m "Adiciona busca por nome na página de personagens"
   ```
4. Quando quiser mandar para a `dev`, pede ao Claude (ou usa a skill `/atualizar-branch`, se tiver). Ele faz:
   ```bash
   git push                       # publica a sua branch
   git switch dev
   git merge --ff-only origin/dev # traz o que os colegas já mandaram
   git merge --ff-only bb/<integrante>
   git push
   git switch bb/<integrante>     # volta para a sua branch
   ```
5. Da `dev` para a `main` é o mesmo processo, mas só quando você pedir.

## Quando o fast-forward falha

Isso acontece quando a `dev` tem commits que a sua branch não tem, por exemplo quando um colega mandou trabalho antes de você. O Claude:

- para e mostra quais commits só existem na `dev` (`git log --oneline bb/<integrante>..dev`);
- mostra as opções, mas não executa nenhuma:
  - atualizar a sua branch com a `dev` (`git switch bb/<integrante>` e depois `git merge dev`). Como isso cria um commit de merge, **quem roda é você**;
  - ou abrir um pull request no GitHub, de `bb/<integrante>` para `dev`.

## O que o Claude nunca faz

- `git commit`, de qualquer forma
- `git merge` sem `--ff-only`, ou com `--no-ff`
- `git rebase`, `git reset`
- `git push --force` ou `--force-with-lease`
- apagar branches ou tags
- mexer na branch de outro integrante sem você pedir
- resolver conflito ou "dar um jeito" quando o fast-forward falha

## Trava extra: regra `deny` no `settings.json` (opcional)

O Claude segue as regras do `CLAUDE.md`, mas elas são só instruções. Para **bloquear** os comandos de verdade, adicione regras `deny` no `settings.json`. Com isso, o Claude Code recusa o comando antes de rodar, mesmo que o Claude tente.

Onde colocar:

- `.claude/settings.json` na raiz do projeto, para valer só naquele projeto (e para quem clonar o repositório); ou
- `~/.claude/settings.json` (no Windows, `C:\Users\<seu-usuário>\.claude\settings.json`), para valer em todos os projetos.

```json
{
  "permissions": {
    "deny": [
      "Bash(git commit:*)",
      "Bash(git rebase:*)",
      "Bash(git reset:*)",
      "Bash(git merge --no-ff:*)",
      "Bash(git push --force:*)",
      "Bash(git push -f:*)",
      "Bash(git push --force-with-lease:*)",
      "Bash(git branch -D:*)",
      "Bash(git branch -d:*)",
      "PowerShell(git commit:*)",
      "PowerShell(git rebase:*)",
      "PowerShell(git reset:*)",
      "PowerShell(git merge --no-ff:*)",
      "PowerShell(git push --force:*)",
      "PowerShell(git push -f:*)",
      "PowerShell(git push --force-with-lease:*)",
      "PowerShell(git branch -D:*)",
      "PowerShell(git branch -d:*)"
    ]
  }
}
```

Observações:

- **Se o arquivo já existir**, não substitua tudo: junte a lista `deny` dentro do `"permissions"` que já está lá. Por exemplo, se já houver um `"allow"`, o `"deny"` fica do lado dele, no mesmo `"permissions"`.
- As linhas com `PowerShell(...)` são para quem usa o Claude Code no Windows, onde ele também roda comandos pelo PowerShell. No Mac ou no Linux, bastam as linhas com `Bash(...)`.
- O `:*` quer dizer "esse comando com qualquer coisa depois". Assim, `Bash(git commit:*)` bloqueia `git commit -m "..."`, `git commit --amend` etc.
- A regra vale **só para o Claude**. Você continua commitando normalmente pelo seu terminal.
- O `git merge` comum não entra na lista porque o `git merge --ff-only` precisa continuar liberado. Ele fica coberto pela regra do `CLAUDE.md` ("só com `--ff-only`").
- A trava compara o começo do comando. Uma forma diferente de escrever, como `git -C <pasta> commit`, pode escapar dela. Por isso, a regra do `CLAUDE.md` continua sendo a principal e o `deny` é uma segunda camada.
- Depois de salvar, abra uma sessão nova do Claude Code. Para conferir, rode `/permissions` dentro dele: as regras aparecem na aba de negadas.

## Skill `/atualizar-branch` (opcional)

No nosso repositório, o fluxo de merge + push está na skill `.claude/skills/atualizar-branch/SKILL.md`. Se você trabalha no mesmo repositório, ela já vem junto e basta rodar `/atualizar-branch` (vai para a `dev`), `/atualizar-branch main` ou `/atualizar-branch tudo`. Em outro projeto, copie a pasta `atualizar-branch` para `.claude/skills/` desse projeto.
