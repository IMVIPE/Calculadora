document.addEventListener('DOMContentLoaded', () => {
    const calcularBtn = document.getElementById('calcularBtn');
    const verTablaBtn = document.getElementById('verTablaBtn');
    const tablaContainer = document.getElementById('tablaContainer');
    const tablaGanancias = document.getElementById('tablaGanancias').querySelector('tbody');

    calcularBtn.addEventListener('click', calcular);
    verTablaBtn.addEventListener('click', () => {
        tablaContainer.style.display = tablaContainer.style.display === 'none' ? 'block' : 'none';
        verTablaBtn.textContent = tablaContainer.style.display === 'none' ? 'Ver Tabla de Ganancias' : 'Ocultar Tabla de Ganancias';
    });

    function calcular() {
        const capitalInicial = parseInt(document.getElementById('rangoActual').value);
        const cicloMeses = parseInt(document.getElementById('cicloMeses').value);
        const interesMensual = 0.10;

        let capital = capitalInicial;
        let totalGananciaInteres = 0;
        let ganancias1G = 0;
        let ganancias2G = 0;

        let usuarios1G = 0;
        let usuarios2G = 0;

        const capitalMensual = [];
        const ganancias1GMensual = [];
        const ganancias2GMensual = [];
        const totalGananciasMensual = [];

        // Limpiar la tabla de ganancias anterior
        tablaGanancias.innerHTML = '';

        for (let mes = 1; mes <= cicloMeses; mes++) {
            const gananciaInteres = capital * interesMensual;
            totalGananciaInteres += gananciaInteres;
            capital += gananciaInteres;

            // Simulación de invitaciones
            usuarios1G += 1;
            usuarios2G += usuarios1G;

            const capitalInvitado1G = capitalInicial / 2; 
            const capitalInvitado2G = capitalInvitado1G / 2;

            const gananciaInv1G = (capitalInvitado1G * interesMensual) * 0.02;
            const gananciaInv2G = (capitalInvitado2G * interesMensual) * 0.01;

            ganancias1G += gananciaInv1G;
            ganancias2G += gananciaInv2G;

            const totalGanancia = (capital + ganancias1G + ganancias2G).toFixed(2);

            capitalMensual.push(capital.toFixed(2));
            ganancias1GMensual.push(gananciaInv1G.toFixed(2));
            ganancias2GMensual.push(gananciaInv2G.toFixed(2));
            totalGananciasMensual.push(totalGanancia);

            // Agregar fila a la tabla
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${mes}</td>
                <td>$${capital.toFixed(2)}</td>
                <td>$${gananciaInv1G.toFixed(2)}</td>
                <td>$${gananciaInv2G.toFixed(2)}</td>
                <td>$${totalGanancia}</td>
            `;
            tablaGanancias.appendChild(row);
        }

        const totalGanancias = totalGananciasMensual[cicloMeses - 1];
        const estrategia = capital < 1000000 
            ? `Para mejorar tus ganancias, considera aumentar tu inversión inicial en los primeros meses.`
            : `¡Felicidades! Has alcanzado $1,000,000 en capital.`;

        document.getElementById('resultadoCapitalFinal').textContent = `$${capital.toFixed(2)}`;
        document.getElementById('gananciasInteres').textContent = `$${totalGananciaInteres.toFixed(2)}`;
        document.getElementById('ganancias1G').textContent = `$${ganancias1G.toFixed(2)}`;
        document.getElementById('ganancias2G').textContent = `$${ganancias2G.toFixed(2)}`;
        document.getElementById('totalGanancias').textContent = `$${totalGanancias}`;
        document.getElementById('mensajeEstrategia').textContent = estrategia;
        document.getElementById('usuarios1G').textContent = usuarios1G;
        document.getElementById('usuarios2G').textContent = usuarios2G;

        document.getElementById('resultsContainer').style.display = 'block';

        // Crear el gráfico
        crearGrafico({ capitalMensual, ganancias1GMensual, ganancias2GMensual });
    }

    function crearGrafico({ capitalMensual, ganancias1GMensual, ganancias2GMensual }) {
        const ctx = document.getElementById('gananciasChart').getContext('2d');
        if (window.gananciasChart) {
            window.gananciasChart.destroy();
        }

        window.gananciasChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: Array.from({ length: capitalMensual.length }, (_, i) => `Mes ${i + 1}`),
                datasets: [
                    {
                        label: 'Capital Propio',
                        data: capitalMensual,
                        borderColor: 'red',
                        fill: false,
                    },
                    {
                        label: 'Ganancias 1ª Generación',
                        data: ganancias1GMensual,
                        borderColor: 'yellow',
                        fill: false,
                    },
                    {
                        label: 'Ganancias 2ª Generación',
                        data: ganancias2GMensual,
                        borderColor: 'green',
                        fill: false,
                    }
                ],
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Capital Ganado ($)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Tiempo (Meses)'
                        }
                    }
                }
            }
        });
    }
});
