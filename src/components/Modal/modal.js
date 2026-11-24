// Componente Modal (T-17)
// Um único modal do Bootstrap por página (RF05), com TODOS os campos do item clicado.
// Como o Card, ele não sabe quais são os campos de cada recurso: quem decide é o
// script.js da página, que monta a lista de campos e chama mostrarDetalhes.
//
// Uso: mostrarDetalhes(titulo, campos, imagem)
//   titulo: o nome do item (vira o título do modal e o alt da imagem)
//   campos: array de objetos { rotulo, valor }. O valor pode ser:
//             - texto ou número: aparece como está;
//             - array: uma linha para cada item (ex.: as ocupações);
//             - null, '' ou array vazio: aparece "Não informado".
//           idioma (opcional, T-28): ex.: 'en' nos textos em inglês. Vira o lang do valor,
//           e o leitor de tela lê com a pronúncia certa.
//   imagem: link da imagem, ou null (as frases não têm imagem)
//
// Exemplo (Personagens), no script.js da página:
//   function abrirPersonagem(item) {
//       mostrarDetalhes(item.name, [
//           { rotulo: 'Nome completo', valor: item.full_name },
//           { rotulo: 'Ator', valor: item.portrayed_by },
//           { rotulo: 'Ocupações', valor: item.occupations }
//       ], item.image);
//   }
//
// O HTML do modal não fica nos index.html: ele é criado aqui na primeira vez que
// a página abre um item, e reaproveitado nos cliques seguintes.

// Elemento que estava com o foco quando o modal abriu (o botão "Ver detalhes").
// Quando o modal abre pelo JavaScript, o Bootstrap não devolve o foco sozinho ao fechar.
let elementoQueAbriuModal = null;

// Cria a estrutura do modal do Bootstrap, coloca no fim do <body> e devolve o elemento
function criarModal() {
    // tabindex -1: o Bootstrap consegue mandar o foco para o modal quando ele abre
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'modal-detalhes';
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('aria-labelledby', 'modal-detalhes-titulo');   // o leitor de tela lê o título
    modal.setAttribute('aria-hidden', 'true');

    // modal-lg: mais largo no computador; centered: no meio da tela;
    // scrollable: só o corpo rola quando o texto é longo;
    // fullscreen-sm-down: ocupa a tela inteira no celular
    const dialogo = document.createElement('div');
    dialogo.className = 'modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down';

    const conteudo = document.createElement('div');
    conteudo.className = 'modal-content modal-detalhes';

    // ----- Cabeçalho: título e o X -----
    const cabecalho = document.createElement('div');
    cabecalho.className = 'modal-header';

    // h2 com cara de h4: o h1 é o título da página
    const titulo = document.createElement('h2');
    titulo.className = 'modal-title h4';
    titulo.id = 'modal-detalhes-titulo';

    // data-bs-dismiss="modal": o próprio Bootstrap fecha o modal no clique
    const botaoX = document.createElement('button');
    botaoX.type = 'button';
    botaoX.className = 'btn-close';
    botaoX.setAttribute('data-bs-dismiss', 'modal');
    botaoX.setAttribute('aria-label', 'Fechar');   // o X não tem texto: o leitor de tela lê "Fechar"

    cabecalho.appendChild(titulo);
    cabecalho.appendChild(botaoX);

    // ----- Corpo: preenchido a cada clique pelo mostrarDetalhes -----
    const corpo = document.createElement('div');
    corpo.className = 'modal-body';
    corpo.id = 'modal-detalhes-corpo';

    // ----- Rodapé: botão "Fechar" -----
    const rodape = document.createElement('div');
    rodape.className = 'modal-footer';

    const botaoFechar = document.createElement('button');
    botaoFechar.type = 'button';
    botaoFechar.className = 'btn btn-secondary';
    botaoFechar.setAttribute('data-bs-dismiss', 'modal');
    botaoFechar.textContent = 'Fechar';

    rodape.appendChild(botaoFechar);

    conteudo.appendChild(cabecalho);
    conteudo.appendChild(corpo);
    conteudo.appendChild(rodape);
    dialogo.appendChild(conteudo);
    modal.appendChild(dialogo);

    // 'hidden.bs.modal': evento do Bootstrap, disparado quando o modal termina de fechar.
    // O foco volta para o "Ver detalhes" que abriu o modal, e quem usa o teclado
    // continua do mesmo ponto da lista (RNF02).
    modal.addEventListener('hidden.bs.modal', function () {
        if (elementoQueAbriuModal) {
            elementoQueAbriuModal.focus();
        }
    });

    document.body.appendChild(modal);
    return modal;
}

// Acrescenta UM campo na lista: o rótulo (dt) e o valor (dd)
function adicionarCampo(lista, rotulo, valor, idioma) {
    const termo = document.createElement('dt');
    termo.className = 'col-sm-4';
    termo.textContent = rotulo;

    const descricao = document.createElement('dd');
    descricao.className = 'col-sm-8';

    if (idioma) {
        descricao.lang = idioma;   // ex.: lang="en" no texto em inglês
    }

    // instanceof Array (aula 02): true quando o valor é um array
    const ehArray = valor instanceof Array;

    if (valor === null || valor === undefined || valor === '' || (ehArray && valor.length === 0)) {
        // Sem informação: o campo continua aparecendo (o RF05 pede todos)
        descricao.textContent = 'Não informado';
        descricao.className = 'col-sm-8 modal-vazio';
    } else if (ehArray) {
        // Array: uma linha para cada item
        const linhas = document.createElement('ul');
        linhas.className = 'list-unstyled mb-0';

        valor.forEach(function (texto) {
            const linha = document.createElement('li');
            linha.textContent = texto;
            linhas.appendChild(linha);
        });

        descricao.appendChild(linhas);
    } else {
        // textContent, e não innerHTML: o texto vem da API
        descricao.textContent = valor;
    }

    lista.appendChild(termo);
    lista.appendChild(descricao);
}

// Preenche o modal com o item clicado e abre
function mostrarDetalhes(titulo, campos, imagem) {
    // O modal só é criado na primeira vez; depois, é sempre o mesmo
    let modal = document.querySelector('#modal-detalhes');
    if (modal === null) {
        modal = criarModal();
    }

    document.querySelector('#modal-detalhes-titulo').textContent = titulo;

    // Limpa o item anterior antes de colocar o novo
    const corpo = document.querySelector('#modal-detalhes-corpo');
    corpo.innerHTML = '';

    if (imagem) {
        const img = document.createElement('img');
        img.className = 'modal-imagem';
        img.src = imagem;
        img.alt = titulo;
        corpo.appendChild(img);
    }

    // Lista de descrição: rótulo à esquerda e valor à direita no computador,
    // um embaixo do outro no celular (col-sm-4 / col-sm-8)
    const lista = document.createElement('dl');
    lista.className = 'row modal-campos';

    campos.forEach(function (campo) {
        adicionarCampo(lista, campo.rotulo, campo.valor, campo.idioma);
    });

    corpo.appendChild(lista);

    // Guarda quem abriu (o "Ver detalhes" clicado), para o foco voltar para ele ao fechar
    elementoQueAbriuModal = document.activeElement;

    // Abre o modal pelo JavaScript do Bootstrap. O Bootstrap prende o foco dentro dele
    // e fecha com Esc, com o X, com o botão "Fechar" ou com clique fora.
    bootstrap.Modal.getOrCreateInstance(modal).show();
}
