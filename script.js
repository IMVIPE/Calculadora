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

    calcularBtn.addEventListener('click', () => calcular(false));
    duplicarTiempoBtn.addEventListener('click', () => calcular(true));

    function calcular(duplicarTiempo) {
        try {
            const capitalInicial = parseInt(document.getElementById('rangoActual').value);
            const cicloMeses = parseInt(document.getElementById('cicloMeses').value);
            const usuariosGen1 = parseInt(document.getElementById('usuariosGen1').value);
            const usuariosGen2PorGen1 = parseInt(document.getElementById('usuariosGen2PorGen1').value);

            if (isNaN(capitalInicial) || isNaN(cicloMeses) || isNaN(usuariosGen1) || isNaN(usuariosGen2PorGen1) || cicloMeses < 1) {
                alert("Por favor, ingrese valores válidos.");
                return;
            }

            const interesMensual = 0.07;
            let capital = capitalInicial;
            let ganancias1G = 0;
            let ganancias2G = 0;

            let usuarios1G = usuariosGen1;
            let usuarios2G = 0;

            let totalGananciaAportes = 0;
            let totalGananciaAportesMitad = 0;
            let capitalAportes = capitalInicial;
            let capitalAportesMitad = capitalInicial / 2;

            let totalGananciaInteresCompuesto = 0;

            if (!duplicarTiempo) {
                tablaGanancias.innerHTML = '';
            }

            const mesesTotales = duplicarTiempo ? cicloMeses * 2 : cicloMeses;
            const inicioDuplicado = duplicarTiempo ? cicloMeses + 1 : 1;

            for (let mes = inicioDuplicado; mes <= mesesTotales; mes++) {
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
                    usuarios1G += usuariosGen1;
                }

                if (mes > 2) {
                    usuarios2G += usuariosGen2PorGen1 * usuarios1G;
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

            mensajeEstrategiaElement.textContent = capital < 250000 
                ? `Para mejorar tus ganancias, considera aumentar tu inversión inicial en los primeros meses. Te faltan $${(250000 - capital).toFixed(2)} para alcanzar los $250,000.` 
                : capital < 500000 
                    ? `¡Felicitaciones! Has alcanzado $250,000. Ahora, te faltan $${(500000 - capital).toFixed(2)} para alcanzar los $500,000.` 
                    : capital < 1000000 
                        ? `¡Felicitaciones! Has alcanzado $500,000. Ahora, te faltan $${(1000000 - capital).toFixed(2)} para alcanzar el millón.` 
                        : '¡Felicidades! Has alcanzado $1,000,000 en capital y eres parte del 1% superior.';

            resultsContainer.style.display = 'block';

        } catch (error) {
            console.error('Ocurrió un error durante el cálculo:', error);
        }
    }
});
