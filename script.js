document.addEventListener('DOMContentLoaded', () => {
    const calcularBtn = document.getElementById('calcularBtn');
    const resultsContainer = document.getElementById('resultsContainer');
    const tablaGanancias = document.getElementById('tablaGanancias').querySelector('tbody');
    const totalGananciasElement = document.getElementById('totalGanancias');
    const gananciasAportesElement = document.getElementById('gananciasAportes');
    const gananciasAportesMitadElement = document.getElementById('gananciasAportesMitad');
    const capitalFinalElement = document.getElementById('resultadoCapitalFinal');
    const mensajeEstrategiaElement = document.getElementById('mensajeEstrategia');

    // Asegurarnos de que los elementos estén presentes antes de empezar
    if (!calcularBtn || !resultsContainer || !tablaGanancias) {
        console.error('Error: No se encontraron algunos elementos importantes en el DOM.');
        return;
    }

    calcularBtn.addEventListener('click', calcular);

    function calcular() {
        try {
            const capitalInicial = parseInt(document.getElementById('rangoActual').value);
            const cicloMeses = parseInt(document.getElementById('cicloMeses').value);

            if (isNaN(capitalInicial) || isNaN(cicloMeses) || cicloMeses < 1) {
                alert("Por favor, ingrese un rango y un ciclo de meses válidos.");
                return;
            }

            const interesMensual = 0.10;
            let capital = capitalInicial;
            let ganancias1G = 0;
            let ganancias2G = 0;

            let usuarios1G = 0;
            let usuarios2G = 0;

            let totalGananciaAportes = 0;
            let totalGananciaAportesMitad = 0;
            let capitalAportes = 0;
            let capitalAportesMitad = 0;

            // Limpiar tabla de resultados anteriores
            tablaGanancias.innerHTML = '';

            for (let mes = 1; mes <= cicloMeses; mes++) {
                // Calcular el interés compuesto sobre el capital inicial
                const gananciaInteres = capital * interesMensual;
                capital += gananciaInteres;

                // Simulación de aportes mensuales iguales al capital inicial
                capitalAportes += capitalInicial;
                const gananciaAportes = capitalAportes * interesMensual;
                capitalAportes += gananciaAportes;
                totalGananciaAportes = capitalAportes;

                // Simulación de aportes mensuales iguales a la mitad del capital inicial
                capitalAportesMitad += capitalInicial / 2;
                const gananciaAportesMitad = capitalAportesMitad * interesMensual;
                capitalAportesMitad += gananciaAportesMitad;
                totalGananciaAportesMitad = capitalAportesMitad;

                // Calcular las ganancias de la 1ª y 2ª generación
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
                    <td class="capital-propio">${capital.toFixed(2)}</td>
                    <td>${gananciaInv1G.toFixed(2)}</td>
                    <td>${gananciaInv2G.toFixed(2)}</td>
                    <td>${totalGanancia.toFixed(2)}</td>
                    <td class="aporte-mensual">${totalGananciaAportes.toFixed(2)}</td>
                    <td class="aporte-mensual">${totalGananciaAportesMitad.toFixed(2)}</td>
                `;
                tablaGanancias.appendChild(row);
            }

            // Actualizar resultados finales
            capitalFinalElement.textContent = capital.toFixed(2);
            gananciasAportesElement.textContent = totalGananciaAportes.toFixed(2);
            gananciasAportesMitadElement.textContent = totalGananciaAportesMitad.toFixed(2);
            totalGananciasElement.textContent = (capital + ganancias1G + ganancias2G).toFixed(2);
            mensajeEstrategiaElement.textContent = capital < 1000000 
                ? 'Para mejorar tus ganancias, considera aumentar tu inversión inicial en los primeros meses.'
                : '¡Felicidades! Has alcanzado $1,000,000 en capital.';

            // Mostrar la sección de resultados
            resultsContainer.style.display = 'block';
        } catch (error) {
            console.error('Ocurrió un error durante el cálculo:', error);
        }
    }
});
