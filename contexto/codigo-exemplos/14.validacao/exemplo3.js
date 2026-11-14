
const nome = document.querySelector('#nome');
const erroNome = document.querySelector('#erro-nome');

nome.addEventListener('input', function(){

    erroNome.textContent = '';

    // houve um erro na validação do pattern
    if (nome.validity.patternMismatch){

        let msg = 'Use apenas letras e espaços em branco';

        erroNome.className = 'erro';
        erroNome.textContent = msg;

        nome.setCustomValidity(msg);
    }
    // verifico se o nome possui menos que 5 caracteres
    else if (nome.value.length < 5){
        let msg = 'O nome deve possuir mais do que 5 caracteres';

        erroNome.className = 'erro';
        erroNome.textContent = msg;

        nome.setCustomValidity(msg);
    }
    // se não tiver erro
    else{
        let msg = 'ok';

        erroNome.className = 'acerto';
        erroNome.textContent = msg;
        // string vazia sinaliza que não houve erro na validação
        nome.setCustomValidity('');
    }

});




const form = document.querySelector('form');
form.noValidate = true;

form.addEventListener('submit', function(e){

    e.preventDefault();

    if(form.checkValidity()){ // true
        //console.log('Formulário válido!');
        form.submit();
    }
    else{
        console.log('Formulário inválido');
    }

});