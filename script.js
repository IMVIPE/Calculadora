document.addEventListener('DOMContentLoaded', () => {
    const calcularBtn = document.getElementById('calcularBtn');
    const tablaGanancias = document.getElementById('tablaGanancias').querySelector('tbody');

    calcularBtn.addEventListener('click', calcular);

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

        const totalGanancias = (capital + ganancias1G + ganancias2G).toFixed(2);
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
    }
});
