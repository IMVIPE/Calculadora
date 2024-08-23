document.addEventListener('DOMContentLoaded', () => {
    const calcularBtn = document.getElementById('calcularBtn');
    const tablaGanancias = document.getElementById('tablaGanancias').querySelector('tbody');
    const countdownContainer = document.getElementById('countdownContainer');
    const resultsContainer = document.getElementById('resultsContainer');
    const countdownElement = document.getElementById('countdown');
    const clockSound = document.getElementById('clockSound');

    calcularBtn.addEventListener('click', () => {
        startCountdown();
    });

    function formatK(value) {
        if (value >= 1000000) {
            return (value / 1000000).toFixed(6) + 'M';
        } else if (value >= 100000) {
            return (value / 1000).toFixed(3) + 'k';
        } else {
            return `$${value.toFixed(2)}`;
        }
    }

    function getBackgroundColor(value) {
        if (value >= 1000000) {
            return '#0056b3'; // Más oscuro para valores a partir de 1M
        } else if (value >= 500000) {
            return '#1e90ff';
        } else if (value >= 250000) {
            return '#87ceeb';
        } else if (value >= 100000) {
            return '#add8e6'; // Más claro para valores desde 100k hasta 250k
        } else {
            return 'transparent'; // Sin fondo especial para valores menores a 100k
        }
    }

    function startCountdown() {
        let countdownValue = 5;
        countdownContainer.style.display = 'flex';
        clockSound.play();

        const interval = setInterval(() => {
            countdownElement.textContent = countdownValue;
            if (countdownValue === 1) {
                clearInterval(interval);
                countdownContainer.style.display = 'none';
                showResults();
            } else {
                countdownValue--;
            }
        }, 1000);
    }

    function showResults() {
        calcular(); // Realiza la simulación
        resultsContainer.style.display = 'block';
        animateResults(); // Añadir animación para los resultados
    }

    function animateResults() {
        const resultsElements = resultsContainer.querySelectorAll('span');
        resultsElements.forEach((element, index) => {
            element.style.opacity = 0;
            setTimeout(() => {
                element.style.transition = 'opacity 1s';
                element.style.opacity = 1;
            }, index * 500); // Retraso para la animación de cada resultado
        });
    }

    function calcular() {
        const capitalInicial = parseInt(document.getElementById('rangoActual').value);
        const cicloMeses = parseInt(document.getElementById('cicloMeses').value);
        const interesMensual = 0.10;

        let capital = capitalInicial;
        let totalGananciaInteres = 0;
        let ganancias1G = 0;
        let ganancias2G = 0;

        let usuarios1G = 0;
        let usuarios2G = 0;

        // Limpiar la tabla de ganancias anterior
        tablaGanancias.innerHTML = '';

        for (let mes = 1; mes <= cicloMeses; mes++) {
            const gananciaInteres = capital * interesMensual;
            totalGananciaInteres += gananciaInteres;
            capital += gananciaInteres;

            // Incremento de usuarios: el usuario invita a 1, y cada usuario de 1ª Gen invita a 1.
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
                <td class="capital-propio" style="background-color:${getBackgroundColor(capital)}">${formatK(capital)}</td>
                <td style="background-color:${getBackgroundColor(gananciaInv1G * usuarios1G)}">${formatK(gananciaInv1G * usuarios1G)}</td>
                <td style="background-color:${getBackgroundColor(gananciaInv2G * usuarios2G)}">${formatK(gananciaInv2G * usuarios2G)}</td>
                <td style="background-color:${getBackgroundColor(totalGanancia)}">${formatK(totalGanancia)}</td>
            `;
            tablaGanancias.appendChild(row);
        }

        const totalGanancias = capital + ganancias1G + ganancias2G;
        const estrategia = capital < 1000000 
            ? `Para mejorar tus ganancias, considera aumentar tu inversión inicial en los primeros meses.`
            : `¡Felicidades! Has alcanzado $1,000,000 en capital.`;

        document.getElementById('resultadoCapitalFinal').textContent = formatK(capital);
        document.getElementById('gananciasInteres').textContent = formatK(totalGananciaInteres);
        document.getElementById('ganancias1G').textContent = formatK(ganancias1G);
        document.getElementById('ganancias2G').textContent = formatK(ganancias2G);
        document.getElementById('totalGanancias').textContent = formatK(totalGanancias);
        document.getElementById('mensajeEstrategia').textContent = estrategia;
    }
});
