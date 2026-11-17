// Página inicial (T-19 e T-20)
// Monta o layout (Header, Navbar, Footer) e o carrossel com as imagens da API (/carousel).
//
// raiz = '', porque o index.html fica na pasta src/.
//
// Os scripts não são módulos, então o await precisa ficar dentro de uma async function.

async function iniciarPagina() {
    // Layout comum (T-11): header e menu primeiro, porque não dependem do config.json
    montarHeader('');
    montarNavbar('inicio', '');

    // Configuração (T-12): link da API e prefixo do cache
    const config = await carregarConfig('');
    montarFooter(config.apiUrl);

    // Próximos passos:
    //   const slides = await buscarComCache(config.prefixoCache + 'carrossel', config.apiUrl + '/carousel');
    //   montarCarrossel(slides);             (T-19)
    //   apresentação e atalhos               (T-20)
}

iniciarPagina();
