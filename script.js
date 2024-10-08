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
    let duplicarMeses = false;

    calcularBtn.addEventListener('click', () => {
        cicloMeses = parseInt(document.getElementById('cicloMeses').value);
        duplicarMeses = false;
        calcular();
    });

    duplicarTiempoBtn.addEventListener('click', () => {
        duplicarMeses = true;
        cicloMeses *= 2;  // Duplicamos los meses para extender la tabla
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

            const interesMensual = 0.07; // 7% de interés mensual
            let capital = duplicarMeses ? parseFloat(capitalFinalElement.textContent) : capitalInicial;
            let ganancias1G = duplicarMeses ? parseFloat(gananciaPrimeraGeneracionElement.textContent) : 0;
            let ganancias2G = duplicarMeses ? parseFloat(gananciaSegundaGeneracionElement.textContent) : 0;

            let usuarios1G = duplicarMeses ? usuarios1GPorMes * (cicloMeses / 2) : 0;
            let usuarios2G = duplicarMeses ? usuarios1G * usuarios2GPorUsuario1G : 0;

            let totalGananciaAportes = duplicarMeses ? parseFloat(gananciasAportesElement.getAttribute('data-total')) : 0;
            let totalGananciaAportesMitad = duplicarMeses ? parseFloat(gananciasAportesMitadElement.getAttribute('data-total')) : 0;
            let capitalAportes = duplicarMeses ? parseFloat(capitalFinalElement.textContent) : capitalInicial;
            let capitalAportesMitad = duplicarMeses ? parseFloat(capitalFinalElement.textContent) / 2 : capitalInicial / 2;

            let totalGananciaInteresCompuesto = duplicarMeses ? parseFloat(gananciaInteresCompuestoElement.textContent) : 0;

            if (!duplicarMeses) {
                tablaGanancias.innerHTML = '';
            }

            const inicioCiclo = duplicarMeses ? cicloMeses / 2 + 1 : 1;

            for (let mes = inicioCiclo; mes <= cicloMeses; mes++) {
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

                // Acumulación correcta después de la duplicación
                const totalAcumuladoAportes = totalGananciaAportes + (capitalAportes - capitalInicial) - (duplicarMeses && mes === inicioCiclo ? 0 : gananciaAportes);
                const totalAcumuladoAportesMitad = totalGananciaAportesMitad + (capitalAportesMitad - (capitalInicial / 2)) - (duplicarMeses && mes === inicioCiclo ? 0 : gananciaAportesMitad);

                const gananciaAportesVisual = `<span class="plus-symbol">+${(totalAcumuladoAportes).toFixed(2)}</span>`;
                const gananciaAportesMitadVisual = `<span class="plus-symbol">+${(totalAcumuladoAportesMitad).toFixed(2)}</span>`;

                const row = document.createElement('tr');
                row.style.backgroundColor = duplicarMeses && mes > inicioCiclo ? '#f2f2f2' : '#fff'; // Color clarito para nuevas celdas
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

            // Guardar el total en data-attribute para acumulación futura
            gananciasAportesElement.setAttribute('data-total', totalGananciaAportes.toFixed(2));
            gananciasAportesMitadElement.setAttribute('data-total', totalGananciaAportesMitad.toFixed(2));

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
