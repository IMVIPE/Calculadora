document.addEventListener('DOMContentLoaded', () => {
    const calcularBtn = document.getElementById('calcularBtn');
    const resultsContainer = document.getElementById('resultsContainer');
    const tablaGanancias = document.getElementById('tablaGanancias').querySelector('tbody');
    const totalGananciasElement = document.getElementById('totalGanancias');
    const gananciasInteresElement = document.getElementById('gananciasInteres');
    const capitalFinalElement = document.getElementById('resultadoCapitalFinal');
    const mensajeEstrategiaElement = document.getElementById('mensajeEstrategia');

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

        // Limpiar tabla de resultados anteriores
        tablaGanancias.innerHTML = '';

        for (let mes = 1; mes <= cicloMeses; mes++) {
            const gananciaInteres = capital * interesMensual;
            totalGananciaInteres += gananciaInteres;
            capital += gananciaInteres;

            usuarios1G += 1;
            usuarios2G += usuarios1G;

            const capitalInvitado1G = capitalInicial / 2;
            const capitalInvitado2G = capitalInvitado1G / 2;

            const gananciaInv1G = (capitalInvitado1G * interesMensual) * 0.02;
            const gananciaInv2G = (capitalInvitado2G * interesMensual) * 0.01;

            ganancias1G += gananciaInv1G * usuarios1G;
            ganancias2G += gananciaInv2G * usuarios2G;

            const totalGanancia = capital + ganancias1G + ganancias2G;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${mes}</td>
                <td>${usuarios1G}</td>
                <td>${usuarios2G}</td>
                <td class="capital-propio">${capital.toFixed(2)}</td>
                <td>${gananciaInv1G.toFixed(2)}</td>
                <td>${gananciaInv2G.toFixed(2)}</td>
                <td>${totalGanancia.toFixed(2)}</td>
            `;
            tablaGanancias.appendChild(row);
        }

        const totalGanancias = capital + ganancias1G + ganancias2G;
        const estrategia = capital < 1000000 
            ? 'Para mejorar tus ganancias, considera aumentar tu inversión inicial en los primeros meses.'
            : '¡Felicidades! Has alcanzado $1,000,000 en capital.';

        capitalFinalElement.textContent = capital.toFixed(2);
        gananciasInteresElement.textContent = totalGananciaInteres.toFixed(2);
        totalGananciasElement.textContent = totalGanancias.toFixed(2);
        mensajeEstrategiaElement.textContent = estrategia;

        resultsContainer.style.display = 'block';
    }
});
