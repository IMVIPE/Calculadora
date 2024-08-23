document.addEventListener('DOMContentLoaded', () => {
    const calcularBtn = document.getElementById('calcularBtn');
    const tablaGanancias = document.getElementById('tablaGanancias').querySelector('tbody');

    calcularBtn.addEventListener('click', calcular);

    function formatK(value) {
        return value >= 100000 ? (value / 1000).toFixed(3) + 'k' : `$${value.toFixed(2)}`;
    }

    function getGradientClass(value) {
        if (value >= 1000000) {
            return 'gradient-1000000';
        } else if (value >= 500000) {
            return 'gradient-500000';
        } else if (value >= 250000) {
            return 'gradient-250000';
        } else if (value >= 100000) {
            return 'gradient-100000';
        }
        return '';
    }

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

            // Incremento de usuarios: el usuario invita a 1, y cada usuario de 1ª Gen invita a 1.
            usuarios1G += 1;
            usuarios2G += usuarios1G;

            const capitalInvitado1G = capitalInicial / 2; 
            const capitalInvitado2G = capitalInvitado1G / 2;

            const gananciaInv1G = (capitalInvitado1G * interesMensual) * 0.02;
            const gananciaInv2G = (capitalInvitado2G * interesMensual) * 0.01;

            ganancias1G += gananciaInv1G * usuarios1G;
            ganancias2G += gananciaInv2G * usuarios2G;

            const totalGanancia = capital + ganancias1G + ganancias2G;

            // Agregar fila a la tabla
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${mes}</td>
                <td>${usuarios1G}</td>
                <td>${usuarios2G}</td>
                <td class="capital-propio ${getGradientClass(capital)}">${formatK(capital)}</td>
                <td class="${getGradientClass(gananciaInv1G * usuarios1G)}">${formatK(gananciaInv1G * usuarios1G)}</td>
                <td class="${getGradientClass(gananciaInv2G * usuarios2G)}">${formatK(gananciaInv2G * usuarios2G)}</td>
                <td class="${getGradientClass(totalGanancia)}">${formatK(totalGanancia)}</td>
            `;
            tablaGanancias.appendChild(row);
        }

        const totalGanancias = capital + ganancias1G + ganancias2G;
        const estrategia = capital < 1000000 
            ? `Para mejorar tus ganancias, considera aumentar tu inversión inicial en los primeros meses.`
            : `¡Felicidades! Has alcanzado $1,000,000 en capital.`;

        document.getElementById('resultadoCapitalFinal').textContent = formatK(capital);
        document.getElementById('gananciasInteres').textContent = formatK(totalGananciaInteres);
        document.getElementById('ganancias1G').textContent = formatK(ganancias1G);
        document.getElementById('ganancias2G').textContent = formatK(ganancias2G);
        document.getElementById('totalGanancias').textContent = formatK(totalGanancias);
        document.getElementById('mensajeEstrategia').textContent = estrategia;
        document.getElementById('usuarios1G').textContent = usuarios1G;
        document.getElementById('usuarios2G').textContent = usuarios2G;

        document.getElementById('resultsContainer').style.display = 'block';
    }
});
