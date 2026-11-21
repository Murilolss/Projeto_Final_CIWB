// Componente Navbar (T-11)
// Monta o menu do site dentro de <nav id="menu">: navbar do Bootstrap que recolhe
// no celular, com link para TODAS as páginas (RF01, RF02).
//
// Uso: montarNavbar(paginaAtual, raiz)
//   paginaAtual: 'inicio', 'personagens', 'mortes', 'temporadas', 'episodios' ou 'frases'.
//                O link dessa página recebe a classe active e aria-current="page".
//   raiz: caminho da página até a pasta src/ ('' no index.html, '../../' em pages/<nome>/).
//
// O abrir/fechar do menu no celular é feito pelo próprio Bootstrap
// (bootstrap.bundle.min.js), por causa dos atributos data-bs-toggle e data-bs-target.

// Lista das páginas do site (array de objetos). Para criar uma página nova no menu,
// basta acrescentar um objeto aqui: o menu existe só neste arquivo (RNF03).
const paginasDoMenu = [
    { id: 'inicio', nome: 'Início', caminho: 'index.html' },
    { id: 'personagens', nome: 'Personagens', caminho: 'pages/personagens/index.html' },
    { id: 'mortes', nome: 'Mortes', caminho: 'pages/mortes/index.html' },
    { id: 'temporadas', nome: 'Temporadas', caminho: 'pages/temporadas/index.html' },
    { id: 'episodios', nome: 'Episódios', caminho: 'pages/episodios/index.html' },
    { id: 'frases', nome: 'Frases marcantes', caminho: 'pages/frases/index.html' }
];

function montarNavbar(paginaAtual, raiz) {
    const menu = document.querySelector('#menu');
    menu.innerHTML = '';

    // O próprio <nav id="menu"> vira a navbar do Bootstrap.
    // navbar-expand-lg: o menu fica aberto em telas grandes e recolhe nas menores.
    // sticky-top: o menu fica preso no topo da tela ao rolar a página.
    menu.className = 'navbar navbar-expand-lg sticky-top';
    menu.setAttribute('aria-label', 'Menu principal');

    const container = document.createElement('div');
    container.className = 'container';

    // Botão que abre e fecha o menu no celular
    const botao = document.createElement('button');
    botao.className = 'navbar-toggler';
    botao.type = 'button';
    botao.setAttribute('data-bs-toggle', 'collapse');
    botao.setAttribute('data-bs-target', '#menuLinks');
    botao.setAttribute('aria-controls', 'menuLinks');
    botao.setAttribute('aria-expanded', 'false');

    const icone = document.createElement('span');
    icone.className = 'navbar-toggler-icon';

    // Texto visível no botão: também é o nome que o leitor de tela anuncia
    const textoBotao = document.createElement('span');
    textoBotao.className = 'menu-botao-texto';
    textoBotao.textContent = 'Menu';

    botao.appendChild(icone);
    botao.appendChild(textoBotao);

    // Área que recolhe: o id precisa ser igual ao data-bs-target do botão
    const areaLinks = document.createElement('div');
    areaLinks.className = 'collapse navbar-collapse';
    areaLinks.id = 'menuLinks';

    const lista = document.createElement('ul');
    lista.className = 'navbar-nav';

    // Um <li> com um <a> para cada página da lista
    paginasDoMenu.forEach(function (pagina) {
        const item = document.createElement('li');
        item.className = 'nav-item';

        const link = document.createElement('a');
        link.className = 'nav-link';
        link.href = raiz + pagina.caminho;
        link.textContent = pagina.nome;

        // Marca a página em que o usuário está
        if (pagina.id === paginaAtual) {
            link.className = 'nav-link active';
            link.setAttribute('aria-current', 'page');
        }

        item.appendChild(link);
        lista.appendChild(item);
    });

    areaLinks.appendChild(lista);
    container.appendChild(botao);
    container.appendChild(areaLinks);
    menu.appendChild(container);
}
