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

    function calcular(duplicar = false) {
        try {
            const capitalInicial = parseInt(document.getElementById('rangoActual').value);
            const cicloMeses = duplicar ? parseInt(document.getElementById('cicloMeses').value) * 2 : parseInt(document.getElementById('cicloMeses').value);
            const numInvitadosGen1 = parseInt(document.getElementById('numInvitadosGen1').value);
            const numInvitadosGen2 = parseInt(document.getElementById('numInvitadosGen2').value);

            if (isNaN(capitalInicial) || isNaN(cicloMeses) || cicloMeses < 1) {
                alert("Por favor, ingrese un rango y un ciclo de meses válidos.");
                return;
            }

            const interesMensual = 0.07; // 7% de interés compuesto en vez de 10%
            let capital = capitalInicial;
            let ganancias1G = 0;
            let ganancias2G = 0;

            let usuarios1G = numInvitadosGen1;
            let usuarios2G = 0;

            let totalGananciaAportes = 0;
            let totalGananciaAportesMitad = 0;
            let capitalAportes = capitalInicial;
            let capitalAportesMitad = capitalInicial / 2;

            let totalGananciaInteresCompuesto = 0;

            if (!duplicar) {
                tablaGanancias.innerHTML = ''; // Limpiar tabla de resultados anteriores
            } else {
                const divider = document.createElement('tr');
                divider.classList.add('line-divider');
                const td = document.createElement('td');
                td.setAttribute('colspan', '10');
                divider.appendChild(td);
                tablaGanancias.appendChild(divider);
            }

            for (let mes = 1; mes <= cicloMeses; mes++) {
                // Calcular el interés compuesto sobre el capital inicial
                const gananciaInteres = capital * interesMensual;
                totalGananciaInteresCompuesto += gananciaInteres;
                capital += gananciaInteres;

                // Simulación de aportes mensuales acumulativos
                capitalAportes += capitalInicial;
                const gananciaAportes = capitalAportes * interesMensual;
                totalGananciaAportes += gananciaAportes;
                capitalAportes += gananciaAportes;

                capitalAportesMitad += capitalInicial / 2;
                const gananciaAportesMitad = capitalAportesMitad * interesMensual;
                totalGananciaAportesMitad += gananciaAportesMitad;
                capitalAportesMitad += gananciaAportesMitad;

                // Gen 1 aumenta en número de usuarios seleccionados cada mes
                usuarios1G += numInvitadosGen1;

                // Gen 2 aumenta en número de usuarios seleccionados por Gen 1, empezando desde el segundo mes
                usuarios2G += numInvitadosGen2 * numInvitadosGen1;

                const gananciaInv1G = (capitalInicial * interesMensual) * 0.04 * usuarios1G;
                const gananciaInv2G = (capitalInicial * interesMensual) * 0.02 * usuarios2G;

                ganancias1G += gananciaInv1G;
                ganancias2G += gananciaInv2G;

                const totalGanancia = capital + ganancias1G + ganancias2G;

                // Mostrar ganancias adicionales con símbolo +
                const gananciaAportesVisual = `<span class="plus-symbol">+${gananciaAportes.toFixed(2)}</span>`;
                const gananciaAportesMitadVisual = `<span class="plus-symbol">+${gananciaAportesMitad.toFixed(2)}</span>`;

                // Agregar fila a la tabla
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

            // Actualizar resultados finales y desglose
            capitalFinalElement.textContent = capital.toFixed(2);
            gananciasAportesElement.textContent = totalGananciaAportes.toFixed(2);
            gananciasAportesMitadElement.textContent = totalGananciaAportesMitad.toFixed(2);
            totalGananciasElement.textContent = (capital + ganancias1G + ganancias2G).toFixed(2);

            gananciaInteresCompuestoElement.textContent = totalGananciaInteresCompuesto.toFixed(2);
            gananciaPrimeraGeneracionElement.textContent = ganancias1G.toFixed(2);
            gananciaSegundaGeneracionElement.textContent = ganancias2G.toFixed(2);

            // Estrategia sugerida
            let faltaPara250k = 250000 - capital;
            let faltaPara500k = 500000 - capital;
            let faltaPara1M = 1000000 - capital;

            if (capital < 250000) {
                mensajeEstrategiaElement.textContent = `Te faltan $${faltaPara250k.toFixed(2)} para alcanzar los $250,000.`;
            } else if (capital < 500000) {
                mensajeEstrategiaElement.textContent = `¡Felicidades! Has superado los $250,000. Te faltan $${faltaPara500k.toFixed(2)} para alcanzar los $500,000.`;
            } else if (capital < 1000000) {
                mensajeEstrategiaElement.textContent = `¡Felicidades! Has superado los $500,000. Te faltan $${faltaPara1M.toFixed(2)} para alcanzar $1,000,000.`;
            } else {
                mensajeEstrategiaElement.textContent = '¡Felicidades! Has alcanzado $1,000,000 en capital. ¡Eres parte del 1% que lo logra!';
            }

            // Mostrar la sección de resultados
            resultsContainer.style.display = 'block';
        } catch (error) {
            console.error('Ocurrió un error durante el cálculo:', error);
        }
    }

    function duplicarTiempo() {
        calcular(true);
    }
});
