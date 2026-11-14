// Objeto Date

// const hoje = new Date();

// console.log(hoje);

// const data = new Date(1000000000000); 

// console.log(data);


function dataNascimento(){
    let nasc = document.querySelector('#nasc').value;

    console.log(nasc);

    // desestruturação
    [ano, mes, dia] = nasc.split('-');

    mes = mes - 1;
 
    //const meunasc = new Date(nasc);
    const meunasc = new Date(ano, mes ,dia);

    console.log(meunasc.toLocaleDateString('pt-br'));

    const meses = ['janeiro', 'fevereiro', 'março', 'abril',
                   'maio', 'junho', 'julho', 'agosto', 'setembro',
                   'outubro', 'novembro', 'dezembro'];

    let texto = `Você nasceu em ${meunasc.getDate()} de ${meses[meunasc.getMonth()]} de ${meunasc.getFullYear()}`;

    console.log(texto);

    const diassemana = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];

    texto = `O dia em que você nasceu era ${diassemana[meunasc.getDay()]}`;

    console.log(texto);
}


const agora = new Date();

const prazoFrete = 7;

const entrega = new Date(agora.getTime() + (prazoFrete * 24 * 60 * 60 * 1000));

let texto = `A data da compra foi ${agora.toLocaleDateString('pt-br')}. A data da entrega será ${entrega.toLocaleDateString('pt-br')}`;

console.log(texto);