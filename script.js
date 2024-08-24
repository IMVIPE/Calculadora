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

    calcularBtn.addEventListener('click', calcular);
    duplicarTiempoBtn.addEventListener('click', duplicarTiempo);

    function calcular() {
        try {
            const capitalInicial = parseInt(document.getElementById('rangoActual').value);
            const cicloMeses = parseInt(document.getElementById('cicloMeses').value);
            const usuariosGen1 = parseInt(document.getElementById('usuariosGen1').value);
            const usuariosGen2 = parseInt(document.getElementById('usuariosGen2').value);

            if (isNaN(capitalInicial) || isNaN(cicloMeses) || cicloMeses < 1 || isNaN(usuariosGen1) || isNaN(usuariosGen2)) {
                alert("Por favor, ingrese todos los valores correctamente.");
                return;
            }

            const interesMensual = 0.07; // 30% menos del 10% original
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

                const totalUsuariosGen1 = usuariosGen1 * mes;
                const totalUsuariosGen2 = totalUsuariosGen1 * usuariosGen2;

                const gananciaInv1G = (capitalInicial * 0.04) * totalUsuariosGen1;
                const gananciaInv2G = (capitalInicial * 0.02) * totalUsuariosGen2;

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
                    <td>${totalUsuariosGen1}</td>
                    <td>${totalUsuariosGen2}</td>
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
            const capitalFinal = capital + ganancias1G + ganancias2G;
            let mensajeEstrategia = '';

            if (capitalFinal < 250000) {
                mensajeEstrategia = `Te faltan ${(250000 - capitalFinal).toFixed(2)} para alcanzar $250,000.`;
            } else if (capitalFinal < 500000) {
                mensajeEstrategia = `¡Felicidades! Has alcanzado $250,000. Te faltan ${(500000 - capitalFinal).toFixed(2)} para alcanzar $500,000.`;
            } else if (capitalFinal < 1000000) {
                mensajeEstrategia = `¡Felicidades! Has alcanzado $500,000. Te faltan ${(1000000 - capitalFinal).toFixed(2)} para alcanzar $1,000,000.`;
            } else {
                mensajeEstrategia = '¡Felicidades! Has alcanzado $1,000,000 y te encuentras en el 1% más alto.';
            }

            mensajeEstrategiaElement.textContent = mensajeEstrategia;

            // Mostrar la sección de resultados
            resultsContainer.style.display = 'block';
        } catch (error) {
            console.error('Ocurrió un error durante el cálculo:', error);
        }
    }

    function duplicarTiempo() {
        const cicloMesesInput = document.getElementById('cicloMeses');
        const cicloMeses = parseInt(cicloMesesInput.value);
        cicloMesesInput.value = cicloMeses * 2;

        // Realizamos un nuevo cálculo con el ciclo de meses duplicado
        calcular();
    }
});
