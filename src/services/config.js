// Service config (T-12)
// Lê o config.json com fetch + async/await (padrão da aula 12) e devolve o objeto:
// config.apiUrl e config.prefixoCache. As imagens do carrossel vêm da API (/carousel).
//
// raiz: caminho da página até a pasta src/ ('' no index.html, '../../' em pages/<nome>/).
// O fetch resolve o caminho a partir da PÁGINA aberta (e não deste arquivo),
// por isso o caminho é raiz + 'config.json'.
//
// Uso (dentro de uma async function):
//   const config = await carregarConfig('../../');
//   console.log(config.apiUrl);

async function carregarConfig(raiz) {
    const resposta = await fetch(raiz + 'config.json');

    // resposta.ok é false quando o servidor devolve erro (ex.: 404, arquivo não encontrado)
    if (!resposta.ok) {
        throw new Error('Erro ao carregar a configuração (config.json)');
    }

    // Converte o texto JSON do arquivo em um objeto JavaScript
    const config = await resposta.json();
    return config;
}
