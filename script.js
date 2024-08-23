function calcular() {
    // Obtener valores del formulario
    const capitalInicial = parseInt(document.getElementById('rangoActual').value);
    const cicloMeses = parseInt(document.getElementById('cicloMeses').value);
    const interesMensual = 0.10; // Interés compuesto del 10%

    let capital = capitalInicial;
    let totalGananciaInteres = 0;
    let totalRecompensas = 0;
    let ganancias1G = 0;
    let ganancias2G = 0;
    let rangoFinal = 0;
    let capitalFaltante = 1000000 - capital;

    // Simulación de invitaciones (1 invitado por mes, 2 rangos inferiores)
    let invitaciones1G = 0;
    let invitaciones2G = 0;
    
    let rangoActual = capitalInicial;

    // Realizar los cálculos para cada mes
    for (let mes = 1; mes <= cicloMeses; mes++) {
        const gananciaInteres = capital * interesMensual;
        totalGananciaInteres += gananciaInteres;

        const gananciaUsuario = gananciaInteres * 0.10; // 10% para el usuario
        totalRecompensas += gananciaUsuario;

        // Simulación de invitaciones
        invitaciones1G += 1; // Cada mes el usuario invita a 1 persona
        invitaciones2G += invitaciones1G; // Cada invitado invita a 1 persona más

        // Determinar capital del invitado (2 rangos inferiores)
        let capitalInvitado1G = rangoActual / 2;
        let capitalInvitado2G = capitalInvitado1G / 2;

        // Ganancias por invitaciones
        const gananciaInv1G = (capitalInvitado1G * interesMensual) * 0.02; // 2% de la ganancia de los invitados de 1G
        const gananciaInv2G = (capitalInvitado2G * interesMensual) * 0.01; // 1% de la ganancia de los invitados de 2G

        ganancias1G += gananciaInv1G;
        ganancias2G += gananciaInv2G;

        capital += gananciaUsuario;

        // Calcular cuánto falta para alcanzar $1,000,000
        capitalFaltante = 1000000 - capital;

        // Actualizar rango final basado en el capital acumulado
        if (capital >= rangoActual) {
            rangoFinal = mes; // Actualización de rango mes a mes
        }
    }

    const estrategia = capitalFaltante > 0
        ? `Necesitas continuar invirtiendo para alcanzar $1,000,000.`
        : `¡Felicidades! Has alcanzado el capital de $1,000,000.`;

    // Actualizar el pop-up con los resultados
    document.getElementById('resultadoRango').textContent = `Mes ${rangoFinal}`;
    document.getElementById('resultadoCapitalFinal').textContent = `$${capital.toFixed(2)}`;
    document.getElementById('mensajeCapital').textContent = `$${totalGananciaInteres.toFixed(2)}`;
    document.getElementById('ganancias1G').textContent = `$${ganancias1G.toFixed(2)}`;
    document.getElementById('ganancias2G').textContent = `$${ganancias2G.toFixed(2)}`;
    document.getElementById('totalRecompensas').textContent = `$${totalRecompensas.toFixed(2)}`;
    document.getElementById('mensajeEstrategia').textContent = estrategia;

    // Mostrar el pop-up
    document.getElementById('popup').style.display = 'flex';
}

function cerrarPopup() {
    document.getElementById('popup').style.display = 'none';
}
