# Páginas e estrutura

## Mapa de páginas

| Página | Arquivo | Conteúdo |
|--------|---------|----------|
| Início | `src/index.html` | Apresentação do site + **carrossel de imagens** |
| Uma por recurso | `src/<recurso>.html` | Busca + lista resumida + modal de detalhes |

Os recursos (ex.: `personagens.html`, `planetas.html`) só serão definidos quando a API for escolhida.

## Layout comum (RF01, RNF02)

Toda página, inclusive a inicial, segue o mesmo esqueleto:

```html
<header>  título/logo do site                      </header>
<nav>     menu com links para TODAS as páginas     </nav>   <!-- navbar do Bootstrap, recolhe no celular -->
<main>    conteúdo próprio da página               </main>
<footer>  autoria, disciplina, fonte dos dados     </footer>
```

- O menu marca a página atual (classe `active` + `aria-current="page"`).
- O rodapé cita a API usada como fonte dos dados.

## Página inicial (`index.html`)

- **Carrossel de imagens** (componente `carousel` do Bootstrap) no topo do `main`.
  - As imagens (caminho, texto alternativo e legenda) vêm do **arquivo de configuração** ([03-configuracao.md](03-configuracao.md)), e não ficam fixas no HTML.
  - O JavaScript monta os slides com `createElement`/`appendChild`; o primeiro slide recebe a classe `active`.
  - Toda imagem precisa de `alt` (RNF02).
  - Controles anterior/próximo e indicadores, com texto para leitor de tela (`visually-hidden`).
- Abaixo do carrossel: texto curto sobre o site e atalhos (cards ou botões) para cada página de recurso.
- A página inicial **não** é obrigada a ter lista/busca, porque não é página de recurso.

## Página de recurso

Ordem dentro do `main`:

1. Título da página (`h1`/`h2`).
2. Campo de busca com `label` (RF06).
3. Aviso de carregamento enquanto busca os dados.
4. Lista resumida (RF04): cards ou `list-group` do Bootstrap, em grade responsiva.
5. Mensagem de "nenhum item encontrado" (RF07), escondida por padrão.
6. Um único modal do Bootstrap por página (RF05), preenchido a cada clique.

## Estrutura de pastas proposta para `src/` (RNF03)

```
src/
├── index.html
├── <recurso>.html          # uma por recurso
├── css/
│   └── style.css           # estilos próprios (o Bootstrap vem por CDN)
├── img/                    # imagens locais do carrossel (se não forem URLs externas)
├── js/
│   ├── config.json         # link da API + imagens do carrossel (ver 03-configuracao.md)
│   ├── api.js              # fetch + paginação          (compartilhado)
│   ├── cache.js            # leitura/gravação no localStorage (compartilhado)
│   ├── busca.js            # filtro por nome + mensagem de vazio (compartilhado)
│   ├── ui.js               # montar lista e modal       (compartilhado)
│   ├── carrossel.js        # monta o carrossel (só index.html)
│   └── <recurso>.js        # específico de cada página: campos do resumo e do modal
```

A ideia é que o arquivo de cada recurso só diga **o que** mostrar (quais campos), e os arquivos compartilhados façam o **como**.

> Esta estrutura é uma proposta: pode mudar quando a API for definida.
