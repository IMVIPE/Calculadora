document.addEventListener('DOMContentLoaded', () => {
    const calcularBtn = document.getElementById('calcularBtn');
    const resultsContainer = document.getElementById('resultsContainer');
    const tablaGanancias = document.getElementById('tablaGanancias').querySelector('tbody');
    const totalGananciasElement = document.getElementById('totalGanancias');
    const gananciasAportesElement = document.getElementById('gananciasAportes');
    const gananciasAportesMitadElement = document.getElementById('gananciasAportesMitad');
    const capitalFinalElement = document.getElementById('resultadoCapitalFinal');
    const mensajeEstrategiaElement = document.getElementById('mensajeEstrategia');
    const doblarTiempoBtn = document.getElementById('doblarTiempoBtn');

    const gananciaInteresCompuestoElement = document.getElementById('gananciaInteresCompuesto');
    const gananciaPrimeraGeneracionElement = document.getElementById('gananciaPrimeraGeneracion');
    const gananciaSegundaGeneracionElement = document.getElementById('gananciaSegundaGeneracion');

    calcularBtn.addEventListener('click', calcular);
    doblarTiempoBtn.addEventListener('click', duplicarTiempo);

    function calcular(duplicarMeses = false) {
        try {
            const capitalInicial = parseInt(document.getElementById('rangoActual').value);
            let cicloMeses = parseInt(document.getElementById('cicloMeses').value);
            if (duplicarMeses) cicloMeses *= 2;

            if (isNaN(capitalInicial) || isNaN(cicloMeses) || cicloMeses < 1) {
                alert("Por favor, ingrese un rango y un ciclo de meses válidos.");
                return;
            }

            const usuarios1GInvitados = parseInt(document.getElementById('usuarios1Gen').value);
            const usuarios2GInvitados = parseInt(document.getElementById('usuarios2Gen').value);

            const interesMensual = 0.07;
            let capital = capitalInicial;
            let ganancias1G = 0;
            let ganancias2G = 0;

            let usuarios1G = usuarios1GInvitados;
            let usuarios2G = usuarios1GInvitados * usuarios2GInvitados;

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

                if (mes > 1) {
                    usuarios1G += usuarios1GInvitados;
                }

                if (mes > 2) {
                    usuarios2G += usuarios1GInvitados * usuarios2GInvitados;
                }

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

            let capitalTotal = capital + totalGananciaAportes + totalGananciaAportesMitad;
            if (capitalTotal < 250000) {
                mensajeEstrategiaElement.textContent = `Te faltan ${(250000 - capitalTotal).toFixed(2)} para llegar a $250,000.`;
            } else if (capitalTotal < 500000) {
                mensajeEstrategiaElement.textContent = `¡Felicidades! Has alcanzado $250,000. Te faltan ${(500000 - capitalTotal).toFixed(2)} para llegar a $500,000.`;
            } else if (capitalTotal < 1000000) {
                mensajeEstrategiaElement.textContent = `¡Felicidades! Has alcanzado $500,000. Te faltan ${(1000000 - capitalTotal).toFixed(2)} para llegar a $1,000,000.`;
            } else {
                mensajeEstrategiaElement.textContent = `¡Increíble! Has superado $1,000,000 y formas parte del 1% de los mejores inversores.`;
            }

            resultsContainer.style.display = 'block';
        } catch (error) {
            console.error('Ocurrió un error durante el cálculo:', error);
        }
    }

    function duplicarTiempo() {
        calcular(true);
    }
});
