function imprimeMensagem(){

    alert('Mensagem na função JS');

}

function mudaCor(){

    document.querySelector('#div1').style.backgroundColor = 'purple';
}

function restauraCor(){

    document.querySelector('#div1').style.backgroundColor = 'white';
}

function imprimeTexto(){

    console.log(document.querySelector('#texto').value);
}

const div2 = document.querySelector('#div2');

div2.addEventListener('click', function(e){

    console.log(e.target);
    document.querySelector('#div2').style.borderColor = 'orange';
});

div2.addEventListener('click', function(){
    document.querySelector('#div2').style.backgroundColor = 'blue';
});

div2.onmouseover = function(){
    document.querySelector('#div2').style.width = '200px';
};

document.body.addEventListener('keydown', function(evento){
    console.log(evento.key);
});