window.onload = function (){

    // verificar se o cadastro de pessoas existe no localstorage
    // Se não existir, crio um cadastro vazio

    if (!localStorage.cadastro){
        const cadastro = [];
        localStorage.setItem('cadastro', JSON.stringify(cadastro));
    }
};


const botCadastrar = document.querySelector('#cadastrar');

botCadastrar.onclick = function(){

    // recuperar os valores digitados em cada campo
    const nome = document.querySelector('#nome');
    const peso = document.querySelector('#peso');
    const idade = document.querySelector('#idade');

    // constroi um objeto com os valores digitados
    const novaPessoa = {'nome': nome.value, 'peso': peso.value, 'idade': idade.value};

    // obter o array que está no local storage
    const cadastro = JSON.parse(localStorage.getItem('cadastro'));

    // inserir o objeto no final da lista (cadastro)
    cadastro.push(novaPessoa);

    // armazenar o cadastro no local storage
    localStorage.setItem('cadastro', JSON.stringify(cadastro));

    // limpo os inputs após conclusão do cadastro
    nome.value = '';
    peso.value = '';
    idade.value = ''; 
};

const botMostrar = document.querySelector('#mostrar');

botMostrar.onclick = function(){

    const divCadastrados = document.querySelector('#cadastrados');

    divCadastrados.innerHTML = '';

    // recuperar o array de cadastrados no local storage
    const cadastro = JSON.parse(localStorage.getItem('cadastro'));

    for (let pessoa of cadastro){

        const p = document.createElement('p');

        let texto = `Nome: ${pessoa.nome} - Peso: ${pessoa.peso} - Idade: ${pessoa.idade}`;

        p.textContent = texto;

        divCadastrados.appendChild(p);

    }


};