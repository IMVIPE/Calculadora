document.getElementById('calcularBtn').addEventListener('click', calcular);

function calcular() {
    const capitalInicial = parseInt(document.getElementById('rangoActual').value);
    const cicloMeses = parseInt(document.getElementById('cicloMeses').value);
    const interesMensual = 0.10;

    let capital = capitalInicial;
    let totalGananciaInteres = 0;
    let ganancias1G = 0;
    let ganancias2G = 0;
    let rangoFinal = 0;

    const capitalMensual = [];
    const ganancias1GMensual = [];
    const ganancias2GMensual = [];
    const totalGananciasMensual = [];

    for (let mes = 1; mes <= cicloMeses; mes++) {
        const gananciaInteres = capital * interesMensual;
        totalGananciaInteres += gananciaInteres;
        capital += gananciaInteres;

        // Simulación de invitaciones
        let capitalInvitado1G = capitalInicial / 2; 
        let capitalInvitado2G = capitalInvitado1G / 2;

        const gananciaInv1G = (capitalInvitado1G * interesMensual) * 0.02;
        const gananciaInv2G = (capitalInvitado2G * interesMensual) * 0.01;

        ganancias1G += gananciaInv1G;
        ganancias2G += gananciaInv2G;

        capitalMensual.push(capital.toFixed(2));
        ganancias1GMensual.push(gananciaInv1G.toFixed(2));
        ganancias2GMensual.push(gananciaInv2G.toFixed(2));
        totalGananciasMensual.push((capital + ganancias1G + ganancias2G).toFixed(2));

        if (capital >= capitalInicial) {
            rangoFinal = mes;
        }
    }

    const totalGanancias = (capital + ganancias1G + ganancias2G).toFixed(2);
    const estrategia = capital < 1000000 
        ? `Para mejorar tus ganancias, considera aumentar tu inversión inicial en los primeros meses.`
        : `¡Felicidades! Has alcanzado $1,000,000 en capital.`;

    document.getElementById('resultadoRango').textContent = `Mes ${rangoFinal}`;
    document.getElementById('resultadoCapitalFinal').textContent = `$${capital.toFixed(2)}`;
    document.getElementById('ganancias1G').textContent = `$${ganancias1G.toFixed(2)}`;
    document.getElementById('ganancias2G').textContent = `$${ganancias2G.toFixed(2)}`;
    document.getElementById('totalGanancias').textContent = `$${totalGanancias}`;
    document.getElementById('mensajeEstrategia').textContent = estrategia;

    document.getElementById('resultsContainer').style.display = 'block';

    mostrarGrafico(capitalMensual, ganancias1GMensual, ganancias2GMensual, totalGananciasMensual);
}

function mostrarGrafico(capitalMensual, ganancias1GMensual, ganancias2GMensual, totalGananciasMensual) {
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
                {
                    label: 'Total Ganancias',
                    data: totalGananciasMensual,
                    borderColor: 'purple',
                    fill: false,
                }
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
