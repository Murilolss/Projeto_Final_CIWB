// acessa o elemento <a> cujo atributo id = 'meulink'
let meulink = document.querySelector('#meulink');

// O método random gera um número aleatório no intervalo
// [0,1)
if (Math.random() < 0.5){
    meulink.href = 'http://www.globo.com';
    meulink.textContent = 'Globo.com';
}
else{
    meulink.href= 'http://www.uol.com.br';
    meulink.textContent = 'UOL';
}