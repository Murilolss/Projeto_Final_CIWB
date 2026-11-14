// funções anônimas

// function soma(a,b){
//     return a + b;
// }

// let soma = function(a,b){
//     return a + b;
// };

// let soma = (a, b) => a + b;

// console.log(soma(3,4));

// let concatena = soma;

// console.log(concatena('Arara', 'quara'));

// let msg = nome => {
//     texto = 'Olá, ';
//     texto += nome;
//     alert(texto);
// }

// msg('Neymar Jr.');


// Callback

function printAlert(msg){
    alert('Alert: ' + msg);
}

function printConsole(msg){
    console.log('Console: ' + msg);
}

function printDOM(msg){
    document.body.textContent = 'DOM: ' + msg;
}

function print(msg, printFunction){
    printFunction(msg);
}

print('Moraes', printConsole);
print('Oliva', printAlert);
print('Arnaldo', printDOM);

print('Boa noite', function(m){
    console.log('Anonimo: ' + m);
});

print('Olá seta!', m => {alert('Arrow: ' + m);});



