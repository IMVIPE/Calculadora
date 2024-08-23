function calcular() {
    const capitalInicial = parseFloat(document.getElementById('capitalInicial').value);
    const cicloMeses = parseInt(document.getElementById('cicloMeses').value);
    const interesMensual = parseFloat(document.getElementById('interesMensual').value) / 100;
    const rangoActual = parseInt(document.getElementById('rangoActual').value);
    const numInvitados = parseInt(document.getElementById('numInvitados').value);
    const numInvitados2G = parseInt(document.getElementById('numInvitados2G').value);

    // Cálculos de ganancia individual
    const gananciaMensual = capitalInicial * Math.pow(1 + interesMensual, cicloMeses);
    const extraccionMensual = gananciaMensual * (1 / 3);
    const reinversionMensual = gananciaMensual - extraccionMensual;
    const capitalFinal = capitalInicial + (reinversionMensual * cicloMeses);

    // Cálculo de ganancia de primera y segunda generación
    const ganancia1G = numInvitados * reinversionMensual * 0.02;
    const ganancia2G = numInvitados * numInvitados2G * reinversionMensual * 0.01;
    const gananciaTotal = ganancia1G + ganancia2G + reinversionMensual;

    // Condición para ingresar más capital (si se alcanza un nuevo rango)
    const ingresoCapital = rangoActual < 20 ? `Debes ingresar más capital en el próximo ciclo para avanzar al Rango ${rangoActual + 1}.` : "Has alcanzado el rango máximo.";

    // Mostrar resultados
    document.getElementById('resultadoRango').textContent = `Rango Alcanzado: ${rangoActual + 1}`;
    document.getElementById('resultadoGanancia').textContent = `Ganancia Mensual: $${gananciaMensual.toFixed(2)}`;
    document.getElementById('resultadoExtraccion').textContent = `Extracción Mensual: $${extraccionMensual.toFixed(2)}`;
    document.getElementById('resultadoReinversion').textContent = `Reinversión Mensual: $${reinversionMensual.toFixed(2)}`;
    document.getElementById('resultadoCapitalFinal').textContent = `Capital Final del Ciclo: $${capitalFinal.toFixed(2)}`;
    document.getElementById('ganancia1G').textContent = `Ganancia de Invitados de 1ª Generación: $${ganancia1G.toFixed(2)}`;
    document.getElementById('ganancia2G').textContent = `Ganancia de Invitados de 2ª Generación: $${ganancia2G.toFixed(2)}`;
    document.getElementById('gananciaTotal').textContent = `Ganancia Total (Incluyendo Invitados): $${gananciaTotal.toFixed(2)}`;
    document.getElementById('ingresoCapital').textContent = ingresoCapital;
}
