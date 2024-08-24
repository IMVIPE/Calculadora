document.addEventListener('DOMContentLoaded', () => {
    const calcularBtn = document.getElementById('calcularBtn');
    const duplicarBtn = document.getElementById('duplicarBtn');
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

    calcularBtn.addEventListener('click', calcular);
    duplicarBtn.addEventListener('click', duplicarTiempo);

    function calcular() {
        try {
            const capitalInicial = parseInt(document.getElementById('rangoActual').value);
            const cicloMeses = parseInt(document.getElementById('cicloMeses').value);
            const usuariosPrimeraGen = parseInt(document.getElementById('usuariosPrimeraGen').value);
            const usuariosSegundaGen = parseInt(document.getElementById('usuariosSegundaGen').value);

            if (isNaN(capitalInicial) || isNaN(cicloMeses) || cicloMeses < 1) {
                alert("Por favor, ingrese un rango y un ciclo de meses válidos.");
                return;
            }

            const interesMensual = 0.10 * 0.7; // Ajuste del 30% menos
            let capital = capitalInicial;
            let ganancias1G = 0;
            let ganancias2G = 0;

            let totalGananciaAportes = 0;
            let totalGananciaAportesMitad = 0;
            let capitalAportes = capitalInicial;
            let capitalAportesMitad = capitalInicial / 2;

            let totalGananciaInteresCompuesto = 0;

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

                const usuarios1G = mes * usuariosPrimeraGen;
                const usuarios2G = usuarios1G * usuariosSegundaGen;

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

            const capitalTotal = capital + totalGananciaAportes + totalGananciaAportesMitad;

            let mensajeEstrategia = `Te faltan ${(250000 - capitalTotal).toFixed(2)} para llegar a $250,000.`;
            if (capitalTotal > 250000) {
                mensajeEstrategia = `¡Felicidades! Has superado los $250,000.`;
            }
            if (capitalTotal > 500000) {
                mensajeEstrategia = `¡Felicidades! Has superado los $500,000.`;
            }
            if (capitalTotal > 1000000) {
                mensajeEstrategia = `¡Increíble! Has alcanzado $1,000,000 en capital.`;
            }

            mensajeEstrategiaElement.textContent = mensajeEstrategia;

            resultsContainer.style.display = 'block';
        } catch (error) {
            console.error('Ocurrió un error durante el cálculo:', error);
        }
    }

    function duplicarTiempo() {
        const cicloMeses = parseInt(document.getElementById('cicloMeses').value);
        document.getElementById('cicloMeses').value = cicloMeses * 2;
        calcular();
    }
});
