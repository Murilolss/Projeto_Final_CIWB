// gera um numero aleatório entre 1 e 6
let dado = Math.floor(Math.random()*6) + 1;
 
console.log(dado);

let aposta = Number(prompt('Digite sua aposta', 0));

if (dado == aposta){
    alert('Você acertou!');
}
else{
    alert('Você errou! O valor do dado é ' + dado);
}