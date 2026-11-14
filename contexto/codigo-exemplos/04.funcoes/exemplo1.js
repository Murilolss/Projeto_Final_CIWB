// function imprimeMsg(){
//     alert('Boa noite!');
// }

// // invocação da função
// imprimeMsg();


function soma(x, y){
    return x + y
}

function soma2(x, y){
    // nullish coalescing: se o valor de x for undefined ou nulo (null), x receberá o valor 5. 
    x ??= 5;
    y ??= 10;

    return x + y;
}

// alert(soma(2, 3)); // 5
// alert(soma(2)); // NaN: Not a Number
// alert(soma()); // NaN
// alert(soma(1, 2, 3)); // 3, ignora o 3o argumento

alert(soma2(8,6)); // 14
alert(soma2(8)); // 18
alert(soma2()); // 15