document.addEventListener('DOMContentLoaded', () => {
    const calcularBtn = document.getElementById('calcularBtn');
    const resultsContainer = document.getElementById('resultsContainer');
    const tablaGanancias = document.getElementById('tablaGanancias').querySelector('tbody');
    const totalGananciasElement = document.getElementById('totalGanancias');
    const gananciasInteresElement = document.getElementById('gananciasInteres');
    const gananciasAportesElement = document.getElementById('gananciasAportes');
    const capitalFinalElement = document.getElementById('resultadoCapitalFinal');
    const mensajeEstrategiaElement = document.getElementById('mensajeEstrategia');

    calcularBtn.addEventListener('click', calcular);

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

        let totalGananciaAportes = 0;
        let capitalAportes = 0;

        // Limpiar tabla de resultados anteriores
        tablaGanancias.innerHTML = '';

        for (let mes = 1; mes <= cicloMeses; mes++) {
            const gananciaInteres = capital * interesMensual;
            totalGananciaInteres += gananciaInteres;
            capital += gananciaInteres;

            // Simulación de aportes mensuales iguales al capital inicial
            capitalAportes += capitalInicial;
            const gananciaAportes = capitalAportes * interesMensual;
            totalGananciaAportes += gananciaAportes;
            capitalAportes += gananciaAportes;

            usuarios1G += 1;
            usuarios2G += usuarios1G;

            const capitalInvitado1G = capitalInicial / 2;
            const capitalInv
