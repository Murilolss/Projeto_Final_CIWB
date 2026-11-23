// Service datas
// Troca a data da API (AAAA-MM-DD) pelo formato brasileiro (DD/MM/AAAA).
// Fica em services/ porque várias páginas mostram datas (temporadas e episódios),
// e assim ninguém copia esta função .
// Uso: formatarData('2008-01-20')   // '20/01/2008'

function formatarData(data) {
    // Sem data, não há o que formatar (o Modal mostra "Não informado")
    if (!data) {
        return null;
    }
    
    const partes = data.split('-');
    const ano = partes[0];
    const mes = partes[1];
    const dia = partes[2];

    return `${dia}/${mes}/${ano}`;
}
