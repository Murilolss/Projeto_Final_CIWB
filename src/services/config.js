// Service config
// Lê o config.json com fetch + async/await e devolve o objeto:
// config.apiUrl e config.prefixoCache. As imagens do carrossel vêm da API (/carousel).


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
