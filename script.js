function calcular() {
    const capitalInicial = parseInt(document.getElementById('rangoActual').value);
    const cicloMeses = parseInt(document.getElementById('cicloMeses').value);
    const interesMensual = 0.10; 

    let capital = capitalInicial;
    let totalGananciaInteres = 0;
    let totalRecompensas = 0;
    let ganancias1G = 0;
    let ganancias2G = 0;
    let rangoFinal = 0;
    let capitalFaltante = 1000000 - capital;

    let invitaciones1G = 0;
    let invitaciones2G = 0;
    
    let rangoActual = capitalInicial;

    const capitalMensual = [];
    const ganancias1GMensual = [];
    const ganancias2GMensual = [];
    const totalRecompensasMensual = [];

    for (let mes = 1; mes <= cicloMeses; mes++) {
        const gananciaInteres = capital * interesMensual;
        totalGananciaInteres += gananciaInteres;

        const gananciaUsuario = gananciaInteres * 0.10;
        totalRecompensas += gananciaUsuario;

        invitaciones1G += 1;
        invitaciones2G += invitaciones1G;

        let capitalInvitado1G = rangoActual / 2;
        let capitalInvitado2G = capitalInvitado1G / 2;

        const gananciaInv1G = (capitalInvitado1G * interesMensual) * 0.02;
        const gananciaInv2G = (capitalInvitado2G * interesMensual) * 0.01;

        ganancias1G += gananciaInv1G;
        ganancias2G += gananciaInv2G;

        capital += gananciaUsuario;

        capitalMensual.push(capital.toFixed(2));
        ganancias1GMensual.push(gananciaInv1G.toFixed(2));
        ganancias2GMensual.push(gananciaInv2G.toFixed(2));
        totalRecompensasMensual.push(totalRecompensas.toFixed(2));

        capitalFaltante = 1000000 - capital;

        if (capital >= rangoActual) {
            rangoFinal = mes;
        }
    }

    const estrategia = capitalFaltante > 0
        ? `Podrías haber obtenido más ganancia invirtiendo más capital en los primeros meses.`
        : `¡Felicidades! Has alcanzado el capital de $1,000,000.`;

    document.getElementById('resultadoRango').textContent = `Mes ${rangoFinal}`;
    document.getElementById('resultadoCapitalFinal').textContent = `$${capital.toFixed(2)}`;
    document.getElementById('mensajeCapital').textContent = `$${totalGananciaInteres.toFixed(2)}`;
    document.getElementById('ganancias1G').textContent = `$${ganancias1G.toFixed(2)}`;
    document.getElementById('ganancias2G').textContent = `$${ganancias2G.toFixed(2)}`;
    document.getElementById('totalRecompensas').textContent = `$${totalRecompensas.toFixed(2)}`;
    document.getElementById('mensajeEstrategia').textContent = estrategia;

    mostrarGrafico(capitalMensual, ganancias1GMensual, ganancias2GMensual);

    document.getElementById('popup').style.display = 'flex';
}

function mostrarGrafico(capitalMensual, ganancias1GMensual, ganancias2GMensual) {
    const ctx = document.getElementById('gananciasChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: capitalMensual.length }, (_, i) => `Mes ${i + 1}`),
            datasets: [
                {
                    label: 'Capital Propio',
                    data: capitalMensual,
                    borderColor: 'blue',
                    fill: false,
                },
                {
                    label: 'Ganancias 1ª Generación',
                    data: ganancias1GMensual,
                    borderColor: 'green',
                    fill: false,
                },
                {
                    label: 'Ganancias 2ª Generación',
                    data: ganancias2GMensual,
                    borderColor: 'red',
                    fill: false,
                },
            ],
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function cerrarPopup() {
    document.getElementById('popup').style.display = 'none';
}
