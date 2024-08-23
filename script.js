// Mapeo de Capital por Rango desde 1 hasta 20
const capitalPorRango = {
    1: 50,
    2: 100,
    3: 200,
    4: 300,
    5: 400,
    6: 500,
    7: 1000,
    8: 1500,
    9: 2000,
    10: 2500,
    11: 3000,
    12: 3500,
    13: 4000,
    14: 4500,
    15: 5000,
    16: 6000,
    17: 7000,
    18: 8000,
    19: 9000,
    20: 10000
};

// Actualizar Capital Inicial según el Rango Seleccionado
function actualizarCapital() {
    const rangoActual = parseInt(document.getElementById('rangoActual').value);
    const capitalInicial = capitalPorRango[rangoActual];
    document.getElementById('capitalInicial').value = capitalInicial;
}

// Función Principal de Cálculo
function calcular(event) {
    event.preventDefault();

    const rangoActual = parseInt(document.getElementById('rangoActual').value);
    let capital = capitalPorRango[rangoActual];
    const cicloMeses = parseInt(document.getElementById('cicloMeses').value);
    const interesMensual = 0.10; // Interés compuesto fijo del 10% mensual
    let siguienteRango = rangoActual;

    let totalGananciaInteres = 0;
    let totalAportacionMensual = 0;
    let totalGananciaBruta = 0;
    let capitalFinal = capital;

    let ganancias1G = 0;
    let ganancias2G = 0;

    for (let mes = 1; mes <= cicloMeses; mes++) {
        // Interés sobre el capital inicial aportado mensualmente
        const gananciaInteresMensual = capitalFinal * interesMensual;
        totalGananciaInteres += gananciaInteresMensual;
        totalGananciaBruta += gananciaInteresMensual;

        // Actualización de Capital
        capitalFinal += gananciaInteresMensual;

        // Cálculo de ganancia por invitados
        const rangoInvitado1G = siguienteRango > 2 ? siguienteRango - 2 : 1;
        const gananciaInvitado1G = capitalPorRango[rangoInvitado1G] * interesMensual;
        const comisionInvitado1G = gananciaInvitado1G * 0.12; // 12% de la ganancia del invitado de primera generación

        const rangoInvitado2G = rangoInvitado1G > 2 ? rangoInvitado1G - 2 : 1;
        const gananciaInvitado2G = capitalPorRango[rangoInvitado2G] * interesMensual;
        const comisionInvitado2G = gananciaInvitado2G * 0.005; // 0.5% de la ganancia del invitado de segunda generación

        ganancias1G += comisionInvitado1G;
        ganancias2G += comisionInvitado2G;

        capitalFinal += comisionInvitado1G + comisionInvitado2G;

        // Revisión para subir de rango
        while (siguienteRango < 20 && capitalFinal >= capitalPorRango[siguienteRango + 1]) {
            siguienteRango++;
        }

        totalGananciaBruta = capitalFinal - capital;
    }

    // Cálculo de cuánto falta para llegar a 1,000,000
    const faltaParaMillon = 1000000 - capitalFinal;

    // Estrategia para llegar a 1,000,000
    const estrategia = faltaParaMillon > 0
        ? `Necesitas incrementar tu capital en $${faltaParaMillon.toFixed(2)} para llegar a $1,000,000.`
        : `¡Felicidades! Has alcanzado o superado $1,000,000.`;

    // Mostrar Resultados en el Pop-up
    document.getElementById('resultadoRango').textContent = siguienteRango;
    document.getElementById('resultadoCapitalFinal').textContent = `$${capitalFinal.toFixed(2)}`;
    document.getElementById('gananciaTotalInvitados').textContent = `$${(ganancias1G + ganancias2G).toFixed(2)}`;
    document.getElementById('mensajeCapital').textContent = `Ganancia bruta: $${totalGananciaBruta.toFixed(2)}. ${estrategia}`;

    document.getElementById('popup').style.display = 'flex';
}

// Función para Cerrar el Pop-up
function cerrarPopup() {
    document.getElementById('popup').style.display = 'none';
}
