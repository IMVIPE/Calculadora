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
            const cicloMesesInput = parseInt(document.getElementById('cicloMeses').value);
            const usuariosGen1 = parseInt(document.getElementById('usuariosGen1').value);
            const usuariosGen2 = parseInt(document.getElementById('usuariosGen2').value);

            let cicloMeses = duplicar ? cicloMesesInput * 2 : cicloMesesInput;

            if (isNaN(capitalInicial) || isNaN(cicloMeses) || cicloMeses < 1 || isNaN(usuariosGen1) || isNaN(usuariosGen2)) {
                alert("Por favor, ingrese valores válidos.");
                return;
            }

            const interesMensual = 0.07;
            let capital = capitalInicial;
            let ganancias1G = 0;
            let ganancias2G = 0;

            let totalGananciaAportes = 0;
            let totalGananciaAportesMitad = 0;
            let capitalAportes = capitalInicial;
            let capitalAportesMitad = capitalInicial / 2;

            let totalGananciaInteresCompuesto = 0;

            // Limpiar tabla de resultados anteriores
            tablaGanancias.innerHTML = '';

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

                const usuarios1G = usuariosGen1 * mes;
                const usuarios2G = usuariosGen2 * usuarios1G;

                const capitalInvitado1G = capitalInicial / 2;
                const capitalInvitado2G = capitalInvitado1G / 2;

                const gananciaInv1G = (capitalInvitado1G * interesMensual) * 0.04 * usuarios1G;
                const gananciaInv2G = (capitalInvitado2G * interesMensual) * 0.02 * usuarios2G;

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

            let mensajeEstrategia = '';

            if (capital < 250000) {
                const faltante = 250000 - capital;
                mensajeEstrategia = `Te faltan ${faltante.toFixed(2)} para llegar a $250,000.`;
            } else if (capital < 500000) {
                const faltante = 500000 - capital;
                mensajeEstrategia = `¡Felicidades! Has superado $250,000. Te faltan ${faltante.toFixed(2)} para llegar a $500,000.`;
            } else if (capital < 1000000) {
                const faltante = 1000000 - capital;
                mensajeEstrategia = `¡Felicidades! Has superado $500,000. Te faltan ${faltante.toFixed(2)} para llegar a $1,000,000.`;
            } else {
                mensajeEstrategia = '¡Felicidades! Has alcanzado $1,000,000 en capital.';
            }

            mensajeEstrategiaElement.textContent = mensajeEstrategia;

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
