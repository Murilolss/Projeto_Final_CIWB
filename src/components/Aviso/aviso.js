// Componente Aviso (T-16)
// Mostra e esconde as mensagens da lista dentro de <div id="aviso">:
//   - "Carregando..." enquanto o fetch acontece;
//   - erro, se o config.json ou a API falharem;
//   - "Nenhum item encontrado" quando a busca não acha nada (RF07, mostrado pelo montarLista).
//
// Uso: mostrarAviso(texto, tipo) e esconderAviso()
//   tipo: 'carregando', 'erro' ou 'vazio'
//
// Na página, o erro chega pelo try/catch do iniciarPagina() (decisão do grupo, 15/11/2026):
//   try {
//       mostrarAviso('Carregando...', 'carregando');
//       const itens = await buscarComCache(...);
//       montarLista(itens, criarCardDoItem);   // o montarLista já esconde o aviso
//   } catch (erro) {
//       mostrarAviso('Não foi possível carregar os dados: ' + erro.message, 'erro');
//   }
// erro.message é o texto do throw (ex.: "Erro ao acessar a API (404)") ou, com a API
// fora do ar ou sem internet, o "Failed to fetch" do próprio navegador.

function mostrarAviso(texto, tipo) {
    const aviso = document.querySelector('#aviso');
    aviso.innerHTML = '';

    // Caixa de alerta do Bootstrap, com uma cor para cada tipo
    const caixa = document.createElement('div');

    if (tipo === 'erro') {
        caixa.className = 'alert alert-danger aviso aviso-erro';
        caixa.setAttribute('role', 'alert');     // o leitor de tela anuncia na hora
    } else if (tipo === 'vazio') {
        caixa.className = 'alert alert-warning aviso aviso-vazio';
        caixa.setAttribute('role', 'status');    // anuncia sem interromper
    } else {
        caixa.className = 'alert alert-secondary aviso aviso-carregando';
        caixa.setAttribute('role', 'status');

        // Bolinha girando do Bootstrap (spinner). aria-hidden: o leitor de tela lê só o texto
        const spinner = document.createElement('span');
        spinner.className = 'spinner-border spinner-border-sm';
        spinner.setAttribute('aria-hidden', 'true');
        caixa.appendChild(spinner);
    }

    // textContent, e não innerHTML: a mensagem de erro pode trazer texto de fora
    const mensagem = document.createElement('span');
    mensagem.textContent = texto;
    caixa.appendChild(mensagem);

    aviso.appendChild(caixa);
}

function esconderAviso() {
    const aviso = document.querySelector('#aviso');
    aviso.innerHTML = '';
}
