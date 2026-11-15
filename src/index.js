// Página inicial (T-19 e T-20)
// Monta o layout (Header, Navbar, Footer) e o carrossel com as imagens do config.json.
//
// raiz = '', porque o index.html fica na pasta src/.
//
// Os scripts não são módulos, então o await precisa ficar dentro de uma async function.

async function iniciarPagina() {
    // Layout comum (T-11): header e menu primeiro, porque não dependem do config.json
    montarHeader('');
    montarNavbar('inicio', '');

    // Configuração (T-12): link da API e imagens do carrossel
    const config = await carregarConfig('');
    montarFooter(config.apiUrl);

    // Próximos passos:
    //   montarCarrossel(config.carrossel);   (T-19)
    //   apresentação e atalhos               (T-20)
}

iniciarPagina();
