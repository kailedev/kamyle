document.addEventListener('DOMContentLoaded', function() {
    const inicioNamoro = new Date(2025, 3, 15, 14, 25); // 15 de abril de 2025
    const elemento = document.querySelector('.tempoDeNamoro');
    const dataAtual = document.querySelector('.dataAtual');
    
    function calcularDiferenca() {
        const agora = new Date();
        if (agora < inicioNamoro) {
            return {
                anos: 0,
                meses: 0,
                dias: 0,
                horas: 0,
                minutos: 0,
                segundos: 0
            };
        }

        // Calcula componentes individuais
        let anos = agora.getFullYear() - inicioNamoro.getFullYear();
        let meses = agora.getMonth() - inicioNamoro.getMonth();
        let dias = agora.getDate() - inicioNamoro.getDate();
        let horas = agora.getHours() - inicioNamoro.getHours();
        let minutos = agora.getMinutes() - inicioNamoro.getMinutes();
        let segundos = agora.getSeconds() - inicioNamoro.getSeconds();

        // Ajustes de tempo
        if (segundos < 0) {
            segundos += 60;
            minutos--;
        }
        if (minutos < 0) {
            minutos += 60;
            horas--;
        }
        if (horas < 0) {
            horas += 24;
            dias--;
        }

        // Ajuste de dias (considerando meses com diferentes durações)
        if (dias < 0) {
            const ultimoDiaMesAnterior = new Date(agora.getFullYear(), agora.getMonth(), 0).getDate();
            dias += ultimoDiaMesAnterior;
            meses--;
        }

        // Ajuste de meses
        if (meses < 0) {
            meses += 12;
            anos--;
        }

        return { anos, meses, dias, horas, minutos, segundos };
    }

    function formatarTempo({anos, meses, dias, horas, minutos, segundos}) {
        // Formata para dois dígitos onde necessário
        const f = (n) => n.toString().padStart(2, '0');
        return `Se passaram ${anos} anos, ${meses} meses, ${dias} dias, ${f(horas)}:${f(minutos)}:${f(segundos)}`;
    }

    function dataAtualFormatada() {
        const agora = new Date();
        const opcoes = { year: 'numeric', month: 'long', day: 'numeric' };
        return agora.toLocaleDateString('pt-BR', opcoes);
    }

    function atualizar() {
        const diferenca = calcularDiferenca();
        
        dataAtual.textContent = `Hoje é ${dataAtualFormatada()}`;
        elemento.textContent = formatarTempo(diferenca);
    }

    // Atualiza imediatamente e a cada segundo
    atualizar();
    setInterval(atualizar, 1000);
});
// Adicionar evento de clique para abrir Spotify

document.querySelectorAll('.spotify-letter').forEach(letter => {
  letter.addEventListener('click', () => {
    const songName = letter.querySelector('h1').textContent;
    const artistName = letter.querySelector('h2').textContent;
    const spotifyUrl = `https://open.spotify.com/search/${encodeURIComponent(songName)}%20${encodeURIComponent(artistName)}`;
    window.open(spotifyUrl, '_blank');
  });
});