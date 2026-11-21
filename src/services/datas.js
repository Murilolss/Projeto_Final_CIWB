// Service datas (T-26)
// Troca a data da API (AAAA-MM-DD) pelo formato brasileiro (DD/MM/AAAA).
// Fica em services/ porque várias páginas mostram datas (temporadas e episódios),
// e assim ninguém copia esta função (RNF03).
//
// Uso: formatarData('2008-01-20')   // '20/01/2008'
//
// Por que não usar new Date('2008-01-20')? O JavaScript lê esse formato como meia-noite
// no horário de Londres (UTC). No Brasil (3 horas a menos) isso ainda é dia 19, e a
// data apareceria com um dia a menos. Como a API já manda o texto, basta reorganizá-lo.

function formatarData(data) {
    // Sem data, não há o que formatar (o Modal mostra "Não informado")
    if (!data) {
        return null;
    }

    // split (aula 06): '2008-01-20' vira ['2008', '01', '20']
    const partes = data.split('-');
    const ano = partes[0];
    const mes = partes[1];
    const dia = partes[2];

    return `${dia}/${mes}/${ano}`;
}
