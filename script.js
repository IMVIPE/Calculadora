document.addEventListener('DOMContentLoaded', () => {
    const calcularBtn = document.getElementById('calcularBtn');
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

    const duplicarTiempoBtn = document.getElementById('duplicarTiempoBtn');

    calcularBtn.addEventListener('click', calcular);
    duplicarTiempoBtn.addEventListener('click', duplicarTiempo);

    function calcular() {
        try {
            const capitalInicial = parseInt(document.getElementById('rangoActual').value);
            const cicloMeses = parseInt(document.getElementById('cicloMeses').value);
            const usuariosGen1PorMes = parseInt(document.getElementById('usuariosGen1').value);
            const usuariosGen2PorMes = parseInt(document.getElementById('usuariosGen2').value);

            if (isNaN(capitalInicial) || isNaN(cicloMeses) || cicloMeses < 1) {
                alert("Por favor, ingrese un rango y un ciclo de meses válidos.");
                return;
            }

            const interesMensual = 0.10;
            let capital = capitalInicial;
            let ganancias1G = 0;
            let ganancias2G = 0;

            let usuarios1G = usuariosGen1PorMes; // Se inicializa según el número de usuarios que elija el usuario
            let usuarios2G = 0;

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

                // Gen 1 aumenta según lo que se configure
                if (mes > 1) {
                    usuarios1G += usuariosGen1PorMes;
                }

                // Gen 2 aumenta según el número de usuarios de Gen 1, a partir del segundo mes
                if (mes > 2) {
                    usuarios2G += usuariosGen1PorMes * usuariosGen2PorMes;
                }

                const capitalInvitado1G = capitalInicial / 2;
                const capitalInvitado2G = capitalInvitado1G / 2;

                const gananciaInv1G = (capitalInvitado1G * interesMensual) * 0.02 * usuarios1G;
                const gananciaInv2G = (capitalInvitado2G * interesMensual) * 0.01 * usuarios2G;

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

            let estrategiaMensaje = '';

            if (capital < 250000) {
                estrategiaMensaje = `Te faltan ${(250000 - capital).toFixed(2)} para llegar a $250,000.`;
            } else if (capital < 500000) {
                estrategiaMensaje = `¡Felicidades! Has alcanzado $250,000. Te faltan ${(500000 - capital).toFixed(2)} para llegar a $500,000.`;
            } else if (capital < 1000000) {
                estrategiaMensaje = `¡Felicidades! Has alcanzado $500,000. Te faltan ${(1000000 - capital).toFixed(2)} para llegar a $1,000,000.`;
            } else {
                estrategiaMensaje = '¡Felicidades! Has alcanzado $1,000,000 en capital. Eres parte del 1% que llega tan lejos.';
            }

            mensajeEstrategiaElement.textContent = estrategiaMensaje;

            // Mostrar la sección de resultados
            resultsContainer.style.display = 'block';
        } catch (error) {
            console.error('Ocurrió un error durante el cálculo:', error);
        }
    }

    function duplicarTiempo() {
        const cicloMesesInput = document.getElementById('cicloMeses');
        const cicloMeses = parseInt(cicloMesesInput.value);
        cicloMesesInput.value = cicloMeses * 2; // Duplicar el tiempo de inversión
        calcular(); // Recalcular con el nuevo tiempo
    }
});
