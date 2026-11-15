// Service config (T-12)
// Lê o config.json com fetch + async/await (padrão da aula 12) e devolve o objeto:
// config.apiUrl, config.prefixoCache e config.carrossel.
//
// Função prevista: carregarConfig(raiz)
//   raiz: caminho da página até a pasta src/ ('' no index.html, '../../' em pages/<nome>/).
//   O fetch resolve o caminho a partir da PÁGINA aberta, por isso: fetch(raiz + 'config.json').
// Toda página espera (await) a configuração antes de chamar a API.
