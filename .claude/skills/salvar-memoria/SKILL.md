---
name: salvar-memoria
description: Salva a memória da sessão atual deste projeto em contexto/memory/ (o que foi feito, decisões, pendências). Use quando o usuário rodar /salvar-memoria ou pedir para salvar/registrar a memória da sessão.
argument-hint: "[observação opcional para incluir no registro]"
---

# Salvar memória da sessão

Registra o estado da sessão atual em `contexto/memory/`, a pasta de memória **exclusiva deste projeto**. Não use o sistema de memória global do Claude para isso.

## Passos

1. **Descubra a data de hoje** (formato `AAAA-MM-DD`) a partir do contexto da sessão.

2. **Escolha o arquivo**:
   - Se **nesta conversa** você já criou ou atualizou um arquivo de sessão em `contexto/memory/`, **atualize esse mesmo arquivo**. Leia-o antes de editar.
   - Senão, liste `contexto/memory/` e crie um arquivo novo `AAAA-MM-DD-sessao-NN.md`. NN é o próximo número disponível para a data de hoje (`01`, `02`, …), com dois dígitos.

3. **Reveja a conversa inteira** e, se ajudar, rode `git status` / `git diff --stat` para conferir os arquivos alterados. Extraia:
   - o que foi feito (arquivos criados/alterados, com caminho);
   - as decisões tomadas e quem decidiu (usuário ou Claude, com o motivo);
   - as preferências ou instruções novas do usuário;
   - os problemas encontrados e como foram resolvidos (ou se continuam abertos);
   - as pendências e os próximos passos.

4. **Escreva o arquivo** neste formato, em português do Brasil:

   ```markdown
   # Sessão NN — AAAA-MM-DD

   ## Resumo
   Uma ou duas frases sobre o objetivo e o resultado da sessão.

   ## Feito
   - Item concreto, com caminho do arquivo quando houver.

   ## Decisões
   - Decisão — motivo (quem decidiu).

   ## Pendências / próximos passos
   - Item acionável.
   ```

   - Se algo não couber nessas seções (ex.: "Pontos-chave do enunciado", "Problemas conhecidos"), adicione uma seção extra com título claro.
   - Se houver argumento (`$ARGUMENTS`), inclua-o no registro na seção mais adequada. Se nenhuma servir, crie a seção "Observações do usuário".
   - Ao atualizar um arquivo existente, **mescle** o conteúdo novo com o antigo. Não apague o que já estava lá; marque como concluídas (`~~riscado~~` ou "(feito)") as pendências resolvidas.

5. **Regras de conteúdo**:
   - Seja específico e factual: caminhos, nomes de funções e decisões, não generalidades.
   - Não copie conteúdo inteiro de arquivos nem trechos longos de código. Aponte o caminho.
   - Nunca grave senhas, tokens, chaves de API ou dados pessoais.
   - Converta datas relativas ("amanhã", "semana que vem") em datas absolutas.

6. **Confirme ao usuário** em poucas linhas: qual arquivo foi criado ou atualizado e um resumo do que foi registrado.
