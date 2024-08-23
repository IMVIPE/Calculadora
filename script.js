// Mapeo de Capital por Rango
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
    15: 5000
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
    const interesMensual = parseFloat(document.getElementById('interesMensual').value) / 100;
    const numInvitadosMensuales = parseInt(document.getElementById('numInvitados').value);
    const numInvitados2G = parseInt(document.getElementById('numInvitados2G').value);

    let capital = capitalInicial;
    let totalInvitados1G = 0;
    let totalInvitados2G = 0;

    for (let mes = 1; mes <= cicloMeses; mes++) {
        // Actualización de Invitados
        totalInvitados1G += numInvitadosMensuales;
        totalInvitados2G += numInvitadosMensuales * numInvitados2G;

        // Cálculo de Ganancias
        const gananciaMensual = capital * interesMensual;
        const extraccionMensual = gananciaMensual / 3;
        const reinversionMensual = gananciaMensual - extraccionMensual;

        // Actualización de Capital
        capital += reinversionMensual;

        // Comprobación y Actualización de Rango
        const siguienteRango = rangoActual + 1;
        if (capital >= capitalPorRango[siguienteRango]) {
            capitalInicial = capitalPorRango[siguienteRango];
        }
    }

    // Cálculo de Ganancias por Invitados
    const ganancia1G = totalInvitados1G * 10; // $10 por cada invitado de 1ª generación
    const ganancia2G = totalInvitados2G * 5;  // $5 por cada invitado de 2ª generación
    const gananciaTotal = ganancia1G + ganancia2G;

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
    document.getElementById('ganancia1G').textContent = `Ganancia Total por Invitados de 1ª Generación: $${ganancia1G.toFixed(2)}`;
    document.getElementById('ganancia2G').textContent = `Ganancia Total por Invitados de 2ª Generación: $${ganancia2G.toFixed(2)}`;
    document.getElementById('gananciaTotal').textContent = `Ganancia Total por Invitaciones: $${gananciaTotal.toFixed(2)}`;
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
