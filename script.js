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
function calcular() {
    const rangoActual = parseInt(document.getElementById('rangoActual').value);
    let capitalInicial = capitalPorRango[rangoActual];
    const cicloMeses = parseInt(document.getElementById('cicloMeses').value);
    const interesMensual = 0.10; // Interés compuesto fijo del 10% mensual
    const numInvitadosMensuales = rangoActual > 5 ? cicloMeses * 3 : 0;

    let capital = capitalInicial;
    let totalInvitados1G = 0;
    let totalInvitados2G = 0;
    let ganancias1G = 0;
    let ganancias2G = 0;

    for (let mes = 1; mes <= cicloMeses; mes++) {
        // Actualización de Invitados
        totalInvitados1G += numInvitadosMensuales;
        totalInvitados2G += numInvitadosMensuales * 2; // Cada invitado trae 2 más

        // Cálculo de Ganancias
        const gananciaMensual = capital * interesMensual;
        const reinversionMensual = gananciaMensual * (2/3);  // 2/3 de las ganancias se reinvierten

        // Acumulación de Ganancias por Invitados
        ganancias1G += totalInvitados1G * reinversionMensual * 0.02; // 2% de la ganancia de primera generación
        ganancias2G += totalInvitados2G * reinversionMensual * 0.01; // 1% de la ganancia de segunda generación

        // Actualización de Capital
        capital += reinversionMensual;

        // Comprobación y Actualización de Rango
        const siguienteRango = rangoActual + 1;
        if (siguienteRango <= 20 && capital >= capitalPorRango[siguienteRango]) {
            capitalInicial = capitalPorRango[siguienteRango];
        }
    }

    // Cálculo de Ganancias por Invitados
    const gananciaTotalInvitados = ganancias1G + ganancias2G;

    // Determinar si hay Estancamiento
    const estancamiento = capital < capitalPorRango[siguienteRango] ? 
        "Estancamiento: Considera reinvertir más o aumentar tus invitaciones." : 
        "¡Excelente! No hay estancamientos.";

    // Mensaje sobre Ingreso de Capital Adicional
    const ingresoCapital = capital < capitalPorRango[siguienteRango] ? 
        `Para alcanzar el Rango ${siguienteRango}, necesitas invertir capital adicional hasta alcanzar $${capitalPorRango[siguienteRango]}.` : 
        `Has alcanzado el Rango ${siguienteRango} con tu inversión actual.`;

    // Mostrar Resultados Clave
    document.getElementById('resultadoRango').textContent = `Rango Final Alcanzado: ${siguienteRango}`;
    document.getElementById('resultadoCapitalFinal').textContent = `Capital Final: $${capital.toFixed(2)}`;
    document.getElementById('gananciaTotalInvitados').textContent = `Ganancias por Invitaciones: $${gananciaTotalInvitados.toFixed(2)}`;
    document.getElementById('mensajeCapital').textContent = ingresoCapital;
}
