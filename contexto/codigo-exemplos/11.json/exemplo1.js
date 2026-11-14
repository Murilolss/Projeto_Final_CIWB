const form = document.querySelector('form');

form.onsubmit = function(e){

    // interrompe o comportamento padrão do evento
    e.preventDefault();

    let meuObj = {};

    // A propriedade value acessa o conteúdo do input do formulario
    meuObj.nome = form.nome.value;
    meuObj.sobrenome = form.sobrenome.value;

    console.log(meuObj);

    // converte objeto JavaScript para JSON string
    const meuJson = JSON.stringify(meuObj);

    console.log(meuJson);

    // converte de JSON string para objeto JavaScript
    const outroObj = JSON.parse(meuJson);

    console.log(outroObj);
};

