---
name: atualizar-branch
description: Leva os commits da branch do integrante (bb/<integrante>) para a dev e, se pedido, da dev para a main, usando só merge fast-forward e push, sem criar commit. Use quando o usuário rodar /atualizar-branch ou pedir para mergear/atualizar a dev ou a main e dar push.
argument-hint: "[dev | main | tudo]  (padrão: dev)"
---

# Atualizar branch (merge fast-forward + push)

Leva os commits pelo fluxo do projeto, `bb/<integrante>` → `dev` → `main`, **sem criar nenhum commit**. Só se usa `git merge --ff-only`, que avança o ponteiro da branch. Assim, o histórico continua só com os commits do usuário, sem co-autor.

## Destino (argumento)

| Argumento | O que faz |
|-----------|-----------|
| `dev` (padrão, ou vazio) | `bb/<integrante>` → `dev` |
| `main` | `dev` → `main` (a `dev` precisa estar atualizada com o `origin`) |
| `tudo` | `bb/<integrante>` → `dev` → `main` |

A `main` é a produção: só mexa nela quando o argumento for `main` ou `tudo`.

## Passos

1. **Conferir o ponto de partida:**
   - `git status --short`. Se houver alterações não commitadas, **pare**: sugira a mensagem de commit (regra do `CLAUDE.md`) e peça ao usuário que commite antes.
   - `git branch --show-current`: anote a branch atual, para voltar a ela no final.
   - A origem é a branch atual se ela for `bb/<integrante>`. Se o usuário estiver em outra branch, pergunte qual `bb/<integrante>` usar.
   - Rode `git fetch origin`.
2. **Publicar a origem:** se a `bb/<integrante>` estiver à frente do `origin`, rode `git push` (`git push -u origin <branch>` se ela ainda não tiver upstream).
3. **Para cada passo do destino** (`bb/<integrante>` → `dev` e, se pedido, `dev` → `main`):
   1. `git switch <destino>`;
   2. trazer o que outros integrantes já mandaram para o remoto: `git merge --ff-only origin/<destino>`, se `origin/<destino>` existir;
   3. `git merge --ff-only <origem>`;
   4. `git push` (`git push -u origin <destino>` se o destino ainda não existir no remoto).
4. **Voltar** para a branch anotada no passo 1 (`git switch <branch>`).
5. **Conferir e relatar:**
   - `git branch -vv`: cada branch tocada deve estar igual ao `origin`;
   - `git log --format="%h %an | %s" -5`: o histórico só tem commits do usuário e nenhum commit de merge;
   - responda em poucas linhas: o que avançou (de `hash` para `hash`), o que foi publicado e em qual branch o usuário está.
6. **Quadro do projeto** (https://claude.ai/artifact/9JYwXsumZsapj7BNGeUX74): se algum cartão ficou concluído com isso, ofereça movê-lo para Concluído. Não mova sem o usuário concordar.

## Se o fast-forward falhar

O `--ff-only` falha quando o destino tem commits que a origem não tem, por exemplo quando um colega já mandou trabalho para a `dev`. Nesse caso:

- **Pare.** Não tente outro jeito por conta própria.
- **Explique** quais commits só existem no destino (`git log --oneline <origem>..<destino>`).
- **Mostre as opções** e deixe o usuário decidir e rodar:
  - atualizar a `bb/<integrante>` com a `dev`: `git switch bb/<integrante>` e depois `git merge dev`. Isso cria um commit de merge, então quem roda é o usuário;
  - ou abrir um pull request no GitHub, de `bb/<integrante>` para `dev`.
- Depois que o usuário resolver, rode `/atualizar-branch` de novo.

Se o `push` for recusado por proteção de branch (regra do GitHub que exige PR), pare e indique abrir o pull request.

## Nunca

- Criar commit: nada de `git commit`, de merge sem `--ff-only` nem de `git merge --no-ff`.
- `git rebase`, `git reset`, `git push --force` / `--force-with-lease`, apagar branches ou tags.
- Mexer na branch de outro integrante, a menos que o usuário peça.
- Resolver conflito ou "dar um jeito" quando o fast-forward falhar.
