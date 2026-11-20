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

    // try/catch: se algo der throw lá dentro (config.json ou API fora do ar),
    // o JavaScript pula para o catch, que mostra o erro na tela
    try {
        // Configuração (T-12): link da API e prefixo do cache
        const config = await carregarConfig('');
        montarFooter(config.apiUrl);

        mostrarAviso('Carregando...', 'carregando');

        // Carrossel (T-19). O buscarComCache olha PRIMEIRO o localStorage (chave 'ciwb_carrossel'):
        // se os slides já estiverem lá, usa o cache e não chama a API (RN02).
        // Só na primeira visita ele busca /carousel e salva os 10 slides (RN01).
        // O cache guarda os dados de cada slide (nome, descrição, episódio e o LINK da foto);
        // os arquivos .jpg ficam no cache do próprio navegador.
        const slides = await buscarComCache(config.prefixoCache + 'carrossel', config.apiUrl + '/carousel');
        montarCarrossel(slides);
        esconderAviso();

        // Próximo passo: apresentação e atalhos (T-20)
    } catch (erro) {
        mostrarAviso('Não foi possível carregar os dados: ' + erro.message, 'erro');
    }
}

iniciarPagina();
