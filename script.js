function calcular() {
    // Obtener valores del formulario
    const capitalInicial = parseInt(document.getElementById('rangoActual').value);
    const cicloMeses = parseInt(document.getElementById('cicloMeses').value);
    const interesMensual = 0.15;

    let capital = capitalInicial;
    let totalGananciaInteres = 0;
    let totalRecompensas = 0;
    let rangoFinal = 0;
    let capitalFaltante = 1000000 - capital;

    // Realizar los cálculos para cada mes
    for (let mes = 1; mes <= cicloMeses; mes++) {
        const gananciaInteres = capital * interesMensual;
        totalGananciaInteres += gananciaInteres;

        const gananciaUsuario = gananciaInteres * 0.10; // 10% para el usuario
        const reinversion = gananciaInteres * 0.03; // 3% reinvertido

        totalRecompensas += gananciaUsuario;
        capital += reinversion + gananciaUsuario;

        // Calcular cuánto falta para alcanzar $1,000,000
        capitalFaltante = 1000000 - capital;

        // Actualizar rango final basado en el capital acumulado
        if (capital >= capitalInicial) {
            rangoFinal = mes; // Suponiendo que cada mes se revisa el rango
        }
    }

    const estrategia = capitalFaltante > 0
        ? `Necesitas continuar invirtiendo para alcanzar $1,000,000.`
        : `¡Felicidades! Has alcanzado el capital de $1,000,000.`;

    // Actualizar el pop-up con los resultados
    document.getElementById('resultadoRango').textContent = `Mes ${rangoFinal}`;
    document.getElementById('resultadoCapitalFinal').textContent = `$${capital.toFixed(2)}`;
    document.getElementById('mensajeCapital').textContent = `$${totalGananciaInteres.toFixed(2)}`;
    document.getElementById('totalRecompensas').textContent = `$${totalRecompensas.toFixed(2)}`;
    document.getElementById('mensajeEstrategia').textContent = estrategia;

    // Mostrar el pop-up
    document.getElementById('popup').style.display = 'flex';
}

function cerrarPopup() {
    document.getElementById('popup').style.display = 'none';
}
