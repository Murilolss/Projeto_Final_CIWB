function showUserData(usr){

    const divUsr = document.querySelector('#user');

    divUsr.innerHTML = '';

    const primeiroNome = usr.name.first;
    const ultimoNome = usr.name.last;
    const nomeCompleto = `${primeiroNome} ${ultimoNome}`;

    const foto = usr.picture.large;

    const img = document.createElement('img');
    img.src = foto;
    img.style.width = '200px';

    const p = document.createElement('p');
    p.textContent = nomeCompleto;


    divUsr.appendChild(img);
    divUsr.appendChild(p);

}


async function getUserData(){
    
    let url = 'https://randomuser.me/api/?nat=br';

    const resposta = await fetch(url);

    if (!resposta.ok){
        console.log('Erro ao acessar usuário');
    }
    else{

        const jsonUser = await resposta.json();

        showUserData(jsonUser.results[0]);
    }

}

const botao = document.querySelector('#botao');

botao.onclick = getUserData;