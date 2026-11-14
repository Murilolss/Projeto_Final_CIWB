const form = document.querySelector('form');


async function getAddress(){

    // constroi a url para consulta à API ViaCEP
    let url = `https://viacep.com.br/ws/${this.value}/json/`;

    console.log(url);

    // consulta a API ViaCEP
    const resposta = await fetch(url);

    // se a resposta não chegar ou o cep for inválido
    if (!resposta.ok){
        console.log('cep inválido');
    }
    else{

        // obtém o JSON da Promise
        let jsonCEP = await resposta.json();

        console.log(jsonCEP);

        form.logradouro.value = jsonCEP.logradouro;
        form.complemento.value = jsonCEP.complemento;
        form.bairro.value = jsonCEP.bairro;
        form.cidade.value = jsonCEP.localidade;
        form.estado.value = jsonCEP.estado;
    }

}


const cep = document.querySelector('#cep');

cep.onchange = getAddress;