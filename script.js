// Mapeo de Capital por Rango hasta el Rango 20
const capitalPorRango = {
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
    const numInvitadosMensuales = parseInt(document.getElementById('numInvitados').value);
    const numInvitados2G = parseInt(document.getElementById('numInvitados2G').value);

    let capital = capitalInicial;
    let totalInvitados1G = 0;
    let totalInvitados2G = 0;
    let ganancias1G = 0;
    let ganancias2G = 0;

    for (let mes = 1; mes <= cicloMeses; mes++) {
        // Actualización de Invitados
        totalInvitados1G += numInvitadosMensuales;
        totalInvitados2G += numInvitadosMensuales * numInvitados2G;

        // Cálculo de Ganancias
        const gananciaMensual = capital * interesMensual;
        const extraccionMensual = gananciaMensual / 3;
        const reinversionMensual = gananciaMensual - extraccionMensual;

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
        "Te has estancado en el crecimiento. Considera reinvertir más o aumentar tus invitaciones." : 
        "¡Excelente! Tu capital sigue creciendo sin estancamientos.";

    // Mensaje sobre Ingreso de Capital Adicional
    const ingresoCapital = capital < capitalPorRango[siguienteRango] ? 
        `Para alcanzar el Rango ${siguienteRango}, necesitas invertir capital adicional hasta alcanzar $${capitalPorRango[siguienteRango]}.` : 
        `Has alcanzado el Rango ${siguienteRango} con tu inversión actual.`;

    // Mostrar Resultados
    document.getElementById('resultadoRango').textContent = `Rango Final Alcanzado: ${siguienteRango}`;
    document.getElementById('resultadoGanancia').textContent = `Ganancia Mensual Promedio: $${(capital * interesMensual).toFixed(2)}`;
    document.getElementById('resultadoExtraccion').textContent = `Extracción Mensual Promedio: $${((capital * interesMensual) / 3).toFixed(2)}`;
    document.getElementById('resultadoReinversion').textContent = `Reinversión Mensual Promedio: $${((capital * interesMensual) * (2/3)).toFixed(2)}`;
    document.getElementById('resultadoCapitalFinal').textContent = `Capital Final después de ${cicloMeses} meses: $${capital.toFixed(2)}`;
    document.getElementById('ganancia1G').textContent = `Ganancia Total por Invitados de 1ª Generación: $${ganancias1G.toFixed(2)}`;
    document.getElementById('ganancia2G').textContent = `Ganancia Total por Invitados de 2ª Generación: $${ganancias2G.toFixed(2)}`;
    document.getElementById('gananciaTotal').textContent = `Ganancia Total por Invitaciones: $${gananciaTotalInvitados.toFixed(2)}`;
    document.getElementById('ingresoCapital').textContent = ingresoCapital;
    document.getElementById('resumenEstancamiento').textContent = estancamiento;
}

// Función para Cerrar el Pop-up
function cerrarPopup() {
    document.getElementById('popup').style.display = 'none';
}

// Mostrar el Pop-up al Cargar la Página
window.onload = function() {
    document.getElementById('popup').style.display = 'flex';
};
