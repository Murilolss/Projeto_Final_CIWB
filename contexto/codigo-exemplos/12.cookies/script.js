function getCookie(nomeCookie){

    let nome = nomeCookie + '=';

    let cookieArray = document.cookie.split(';');

    //console.log(cookieArray);

    for (let i = 0; i < cookieArray.length; i++){

        // trim remove espaços em branco do inicio e do fim da string
        let cookie = cookieArray[i].trim();
        //console.log(cookie);

        // verifica se a string começa com o nome do cookie procurado
        if (cookie.startsWith(nome)){
            return decodeURIComponent(cookie.substring(nome.length));
        }
    }

    return "";
}

// criar cookies
document.cookie = 'username=alunoTSI';
document.cookie = 'tema=dark';

console.log(document.cookie);

// data de expiração

document.cookie = 'username=alunoTSI; expires=Tue, 20 Oct 2026 23:59:00 UTC-3;'

const dataExpiracao = new Date(); // cria um objeto com a data atual
dataExpiracao.setDate(dataExpiracao.getDate() + 7);

document.cookie = `tema=dark; expires=${dataExpiracao.toUTCString()};`;

// ler o valor de um cookie

console.log(getCookie('tema'));
console.log(getCookie('username'));

// remover um cookie

const dataExpirada = new Date(0);
document.cookie = `tema=dark; expires=${dataExpirada.toUTCString()};`;




