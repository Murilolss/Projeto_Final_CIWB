// parametros rest

// function nomeCompleto(...args){

//     let nome = '';
//     for(let n of args){
//         nome += n + ' ';
//     }

//     return nome;
// }

// objeto arguments

// function nomeCompleto(){

//     let nome = '';
//     // length: quantidade de argumentos passados para a função
//     for(let i = 0; i < arguments.length; i++){
//         nome += arguments[i] + ' ';
//     }

//     return nome;
// }

// alert(nomeCompleto('João', 'Silva')); // João Silva
// alert(nomeCompleto('Maria', 'Pereira', 'Alves')); // Maria Pereira Alves
// alert(nomeCompleto('José')); // José

function alteraVariavel(x){
    x = 10;
}

function alteraArray(x){
    x[0] = 'XPTO';
}

let a = 7;

alteraVariavel(a); 
alert(a); // 7

let b = ['banana', 'mamão', 'maçã'];
alteraArray(b);
alert(b); // XPTO,mamão,maçã