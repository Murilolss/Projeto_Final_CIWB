// Componente Carrossel (T-19), usado só no index.html
// Recebe os slides da rota /carousel da API (lidos com buscarComCache) e monta o
// carousel do Bootstrap: um .carousel-item por slide (o primeiro com active),
// indicadores, controles anterior/próximo com texto visually-hidden e, embaixo,
// o botão "Pausar cenas" (T-28).
// Cada slide tem image (src), description (alt, RNF02) e name (legenda).
// As imagens têm proporções diferentes (16:9, 4:3, 3:2): usar altura fixa + object-fit: cover.
//
// Uso: montarCarrossel(slides)
//   slides: array de objetos da API, ex.:
//     { name: 'Diga meu nome', description: 'Walter White...', episode_code: '5x07',
//       image: 'https://.../img/carousel/07.jpg' }
//
// No index.js:
//   const slides = await buscarComCache(config.prefixoCache + 'carrossel', config.apiUrl + '/carousel');
//   montarCarrossel(slides);

// Monta UM slide: a imagem e a legenda (nome da cena + código do episódio)
function criarSlide(slide, ativo) {
    const item = document.createElement('div');
    item.className = 'carousel-item';
    if (ativo) {
        item.className = 'carousel-item active';   // o primeiro slide aparece primeiro
    }

    // alt = description: o leitor de tela descreve a cena (RNF02)
    const imagem = document.createElement('img');
    imagem.className = 'd-block w-100 carrossel-imagem';
    imagem.src = slide.image;
    imagem.alt = slide.description;

    const legenda = document.createElement('div');
    legenda.className = 'carousel-caption carrossel-legenda';

    // h2 com cara de h4: o h1 é o título da página
    const titulo = document.createElement('h2');
    titulo.className = 'h4 carrossel-titulo';
    titulo.textContent = slide.name;   // textContent: o texto vem da API
    legenda.appendChild(titulo);

    // Embaixo do nome: o código do episódio (ex.: "Episódio 5x07"), só se a API informar
    if (slide.episode_code) {
        const episodio = document.createElement('p');
        episodio.className = 'carrossel-episodio';
        episodio.textContent = 'Episódio ' + slide.episode_code;
        legenda.appendChild(episodio);
    }

    item.appendChild(imagem);
    item.appendChild(legenda);
    return item;
}

// Monta UM indicador (o tracinho embaixo, que leva direto ao slide de número "indice")
function criarIndicador(indice, ativo) {
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.setAttribute('data-bs-target', '#carrossel-cenas');
    botao.setAttribute('data-bs-slide-to', indice);              // 0, 1, 2...
    botao.setAttribute('aria-label', 'Cena ' + (indice + 1));   // o botão não tem texto

    if (ativo) {
        botao.className = 'active';
        botao.setAttribute('aria-current', 'true');
    }
    return botao;
}

// Monta a seta "anterior" ou "próxima"
//   direcao: 'prev' ou 'next' (o que o Bootstrap espera em data-bs-slide)
//   texto: o que o leitor de tela lê, já que a seta é só um desenho
function criarControle(direcao, texto) {
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = 'carousel-control-' + direcao;
    botao.setAttribute('data-bs-target', '#carrossel-cenas');
    botao.setAttribute('data-bs-slide', direcao);

    // A seta: aria-hidden, porque o leitor de tela lê o texto abaixo
    const icone = document.createElement('span');
    icone.className = 'carousel-control-' + direcao + '-icon';
    icone.setAttribute('aria-hidden', 'true');

    // visually-hidden: invisível na tela, mas lido pelo leitor de tela
    const rotulo = document.createElement('span');
    rotulo.className = 'visually-hidden';
    rotulo.textContent = texto;

    botao.appendChild(icone);
    botao.appendChild(rotulo);
    return botao;
}

// Monta o botão "Pausar cenas" / "Continuar cenas" (T-28), que fica embaixo do carrossel.
//   instancia: o bootstrap.Carousel já criado, com pause() e cycle()
// Quem usa só o teclado também consegue parar a troca automática das fotos.
function criarBotaoPausa(instancia) {
    let pausado = false;

    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = 'btn btn-sm carrossel-pausa';
    botao.setAttribute('aria-controls', 'carrossel-cenas');
    botao.textContent = 'Pausar cenas';

    botao.addEventListener('click', function () {
        if (pausado) {
            instancia.cycle();   // volta a passar a cada 5 s
            pausado = false;
            botao.textContent = 'Pausar cenas';
        } else {
            instancia.pause();   // para no slide atual
            pausado = true;
            botao.textContent = 'Continuar cenas';
        }
    });

    return botao;
}

// Monta o carrossel inteiro dentro de <section id="carrossel"> e liga o autoplay
function montarCarrossel(slides) {
    const area = document.querySelector('#carrossel');
    area.innerHTML = '';

    // carousel-fade: as fotos trocam com um esmaecer (animação do próprio Bootstrap)
    const carrossel = document.createElement('div');
    carrossel.className = 'carousel slide carousel-fade carrossel-cenas';
    carrossel.id = 'carrossel-cenas';

    const indicadores = document.createElement('div');
    indicadores.className = 'carousel-indicators';

    const itens = document.createElement('div');
    itens.className = 'carousel-inner';

    // for com índice (aula 04): o i diz qual slide é o primeiro (i === 0)
    // e para qual slide cada indicador leva
    for (let i = 0; i < slides.length; i++) {
        const ativo = i === 0;
        indicadores.appendChild(criarIndicador(i, ativo));
        itens.appendChild(criarSlide(slides[i], ativo));
    }

    carrossel.appendChild(indicadores);
    carrossel.appendChild(itens);
    carrossel.appendChild(criarControle('prev', 'Anterior'));
    carrossel.appendChild(criarControle('next', 'Próximo'));
    area.appendChild(carrossel);

    // Autoplay pelo JavaScript do Bootstrap, como no bootstrap.Modal do componente Modal:
    // o data-bs-ride="carousel" só funciona nos carrosséis que já existem quando a página
    // termina de carregar, e este é criado depois do fetch.
    // ride: false e pause: false (T-28): sem isso, o Bootstrap volta a passar as fotos
    // sozinho quando o mouse sai ou quando alguém clica numa seta, e o botão "Pausar
    // cenas" não seguraria. Quem liga e desliga é o cycle() e o pause().
    const instancia = bootstrap.Carousel.getOrCreateInstance(carrossel, {
        interval: 5000,     // 5000 ms = 5 s em cada slide
        ride: false,
        pause: false
    });
    instancia.cycle();      // começa a passar sozinho já agora

    area.appendChild(criarBotaoPausa(instancia));
}
