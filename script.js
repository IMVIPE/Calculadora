document.addEventListener('DOMContentLoaded', () => {
    const calcularBtn = document.getElementById('calcularBtn');
    const countdownContainer = document.getElementById('countdownContainer');
    const countdownElement = document.getElementById('countdown');
    const resultsContainer = document.getElementById('resultsContainer');
    const tablaGanancias = document.getElementById('tablaGanancias').querySelector('tbody');
    const clockSound = document.getElementById('clockSound');

    calcularBtn.addEventListener('click', () => {
        startCountdown();
    });

    function startCountdown() {
        let countdownValue = 5;
        countdownContainer.style.display = 'flex';
        clockSound.play();

        const interval = setInterval(() => {
            countdownElement.textContent = countdownValue;
            countdownValue--;

            if (countdownValue < 0) {
                clearInterval(interval);
                countdownContainer.style.display = 'none';
                clockSound.pause();
                showResults();
            }
        }, 1000);
    }

    function showResults() {
        calcular();  // Ejecuta el cálculo
        resultsContainer.style.display = 'block';
        animateResults();  // Animar la aparición de resultados
    }

    function animateResults() {
        const resultsElements = resultsContainer.querySelectorAll('span');
        resultsElements.forEach((element, index) => {
            element.style.opacity = 0;
            setTimeout(() => {
                element.style.transition = 'opacity 1s';
                element.style.opacity = 1;
            }, index * 500);
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

        let usuarios1G
