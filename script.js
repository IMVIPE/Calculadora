document.addEventListener('DOMContentLoaded', () => {
    const calcularBtn = document.getElementById('calcularBtn');
    const duplicarTiempoBtn = document.getElementById('duplicarTiempoBtn');
    const resultsContainer = document.getElementById('resultsContainer');
    const tablaGanancias = document.getElementById('tablaGanancias').querySelector('tbody');
    const totalGananciasElement = document.getElementById('totalGanancias');
    const gananciasAportesElement = document.getElementById('gananciasAportes');
    const gananciasAportesMitadElement = document.getElementById('gananciasAportesMitad');
    const capitalFinalElement = document.getElementById('resultadoCapitalFinal');
    const mensajeEstrategiaElement = document.getElementById('mensajeEstrategia');

    const gananciaInteresCompuestoElement = document.getElementById('gananciaInteresCompuesto');
    const gananciaPrimeraGeneracionElement = document.getElementById('gananciaPrimeraGeneracion');
    const gananciaSegundaGeneracionElement = document.getElementById('gananciaSegundaGeneracion');

    let cicloMeses;

    calcularBtn.addEventListener('click', () => {
        cicloMeses = parseInt(document.getElementById('cicloMeses').value);
        calcular();
    });

    duplicarTiempoBtn.addEventListener('click', () => {
        cicloMeses *= 2;
        document.getElementById('cicloMeses').value = cicloMeses;
        calcular();
    });

    function calcular() {
        try {
            const capitalInicial = parseInt(document.getElementById('rangoActual').value);
            const usuarios1GPorMes = parseInt(document.getElementById('usuariosPrimeraGeneracion').value);
            const usuarios2GPorUsuario1G = parseInt(document.getElementById('usuariosSegundaGeneracion').value);

            if (isNaN(capitalInicial) || isNaN(cicloMeses) || isNaN(usuarios1GPorMes) || isNaN(usuarios2GPorUsuario1G) || cicloMeses < 1) {
                alert("Por favor, ingrese valores válidos.");
                return;
            }

            const interesMensual = 0.07; // 10% original menos 30%
            let capital = capitalInicial;
            let ganancias1G = 0;
            let ganancias2G = 0;

            let usuarios1G = 0; 
            let usuarios2G = 0;

            let totalGananciaAportes = 0;
            let totalGananciaAportesMitad = 0;
            let capitalAportes = capitalInicial;
            let capitalAportesMitad = capitalInicial / 2;

            let totalGananciaInteresCompuesto = 0;

            // Limpiar tabla de resultados anteriores
            tablaGanancias.innerHTML = '';

            for (let mes = 1; mes <= cicloMeses; mes++) {
                const gananciaInteres = capital * interesMensual;
                totalGananciaInteresCompuesto += gananciaInteres;
                capital += gananciaInteres;

                capitalAportes += capitalInicial;
                const gananciaAportes = capitalAportes * interesMensual;
                totalGananciaAportes += gananciaAportes;
                capitalAportes += gananciaAportes;

                capitalAportesMitad += capitalInicial / 2;
                const gananciaAportesMitad = capitalAportesMitad * interesMensual;
                totalGananciaAportesMitad += gananciaAportesMitad;
                capitalAportesMitad += gananciaAportesMitad;

                usuarios1G += usuarios1GPorMes; 
                usuarios2G = usuarios1G * usuarios2GPorUsuario1G; 

                const capitalInvitado1G = capitalInicial / 2;
                const capitalInvitado2G = capitalInvitado1G / 2;

                const gananciaInv1G = (capitalInvitado1G * interesMensual) * 0.04 * usuarios1G;
                const gananciaInv2G = (capitalInvitado2G * interesMensual) * 0.02 * usuarios2G;

                ganancias1G += gananciaInv1G;
                ganancias2G += gananciaInv2G;

                const totalGanancia = capital + ganancias1G + ganancias2G;

                const gananciaAportesVisual = `<span class="plus-symbol">+${gananciaAportes.toFixed(2)}</span>`;
                const gananciaAportesMitadVisual = `<span class="plus-symbol">+${gananciaAportesMitad.toFixed(2)}</span>`;

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${mes}</td>
                    <td>${usuarios1G}</td>
                    <td>${usuarios2G}</td>
                    <td class="capital-propio">${capital.toFixed(2)}</td>
                    <td>${gananciaInv1G.toFixed(2)}</td>
                    <td>${gananciaInv2G.toFixed(2)}</td>
                    <td>${totalGanancia.toFixed(2)}</td>
                    <td>${totalGananciaInteresCompuesto.toFixed(2)}</td>
                    <td class="aporte-mensual">${totalGananciaAportes.toFixed(2)} ${gananciaAportesVisual}</td>
                    <td class="aporte-mensual">${totalGananciaAportesMitad.toFixed(2)} ${gananciaAportesMitadVisual}</td>
                `;
                tablaGanancias.appendChild(row);
            }

            capitalFinalElement.textContent = capital.toFixed(2);
            gananciasAportesElement.textContent = totalGananciaAportes.toFixed(2);
            gananciasAportesMitadElement.textContent = totalGananciaAportesMitad.toFixed(2);
            totalGananciasElement.textContent = (capital + ganancias1G + ganancias2G).toFixed(2);

            gananciaInteresCompuestoElement.textContent = totalGananciaInteresCompuesto.toFixed(2);
            gananciaPrimeraGeneracionElement.textContent = ganancias1G.toFixed(2);
            gananciaSegundaGeneracionElement.textContent = ganancias2G.toFixed(2);

            mensajeEstrategiaElement.textContent = capital < 1000000 
                ? 'Para mejorar tus ganancias, considera aumentar tu inversión inicial en los primeros meses.'
                : '¡Felicidades! Has alcanzado $1,000,000 en capital.';

            resultsContainer.style.display = 'block';
            duplicarTiempoBtn.style.display = 'block';
        } catch (error) {
            console.error('Ocurrió un error durante el cálculo:', error);
        }
    }
});
