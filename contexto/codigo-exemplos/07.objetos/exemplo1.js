// const corinthians = {
//     nome: "Corinthians",
//     prefixo: "Sport Club",
//     sufixo: "Paulista",
//     timeTitular: {
//         goleiro: 'Hugo Souza',
//         zagueiro: 'Gabriel Paulista',
//         atacante: 'Memphis Depay'
//     },
//     nomeCompleto: function(){
//         return `${this.prefixo} ${this.nome} ${this.sufixo}`;
//     }
// };

// console.log(corinthians.timeTitular.goleiro);
// console.log(corinthians.timeTitular['zagueiro']);
// console.log(corinthians['timeTitular']['atacante']);

// for(let x in corinthians){
//     console.log(corinthians[x]);
// }

// for (let [prop, val] of Object.entries(corinthians)){
//     console.log(`${prop} --> ${val}`);
// }

// corinthians.hino = 'Salve o Corinthians ...';

// console.log(corinthians.nome);
// console.log(corinthians['hino']);

// let b = 'prefixo';

// console.log(corinthians[b]);

// console.log(corinthians.nomeCompleto());


// Função construtora

// function Time(nome, prefixo, sufixo){
//     this.nome = nome;
//     this.prefixo = prefixo;
//     this.sufixo = sufixo;

//     this.nomeCompleto = function(){
//         return `${this.prefixo} ${this.nome} ${this.sufixo}`.trim();
//     }
// }

class Time{

    constructor(nome, prefixo, sufixo){
        this.nome = nome;
        this.prefixo = prefixo;
        this.sufixo = sufixo;
        this.hino = '';
    }

    nomeCompleto(){
        return `${this.prefixo} ${this.nome} ${this.sufixo}`.trim();
    }

    get getHino(){
        return this.hino;
    }

    set setHino(x){

        this.hino = x.trim();
    }
}

const palmeiras = new Time('Palmeiras', 'Sociedade Esportiva', '');
const saopaulo = new Time('São Paulo', '', 'Futebol Clube');
const santos = new Time('Santos', '', 'Futebol Clube');
const corinthians = new Time('Corinthians', 'Sport Club', 'Paulista');

palmeiras.setHino = 'Quando surge o alviverde imponente...';

console.log(palmeiras.getHino);


// console.log(palmeiras.nomeCompleto());
// console.log(saopaulo.nomeCompleto());
// console.log(santos.nomeCompleto());
// console.log(corinthians.nomeCompleto());


