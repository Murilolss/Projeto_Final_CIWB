
document.getElementById('botao').onclick = function(e){

    // cria um parágrafo
    const p = document.createElement('p');
    p.textContent = 'Olá, TSI!';

    // substituir o botao pelo paragrafo
    const botao = e.target; // target é o elemento vinculado ao evento
    botao.parentNode.replaceChild(p, botao);

};
