function calcular() {
    const capitalInicial = parseFloat(document.getElementById('capitalInicial').value);
    const cicloMeses = parseInt(document.getElementById('cicloMeses').value);
    const interesMensual = parseFloat(document.getElementById('interesMensual').value) / 100;
    const rangoActual = parseInt(document.getElementById('rangoActual').value);
    const numInvitados = parseInt(document.getElementById('numInvitados').value);

    // Cálculos
    const gananciaMensual = capitalInicial * Math.pow(1 + interesMensual, cicloMeses);
    const extraccionMensual = gananciaMensual * (1 / 3);
    const reinversionMensual = gananciaMensual - extraccionMensual;
    const capitalFinal = capitalInicial + (reinversionMensual * cicloMeses);

    // Mostrar resultados
    document.getElementById('resultadoRango').textContent = `Rango Alcanzado: ${rangoActual + 1}`;
    document.getElementById('resultadoGanancia').textContent = `Ganancia Mensual: $${gananciaMensual.toFixed(2)}`;
    document.getElementById('resultadoExtraccion').textContent = `Extracción Mensual: $${extraccionMensual.toFixed(2)}`;
    document.getElementById('resultadoReinversion').textContent = `Reinversión Mensual: $${reinversionMensual.toFixed(2)}`;
    document.getElementById('resultadoCapitalFinal').textContent = `Capital Final del Ciclo: $${capitalFinal.toFixed(2)}`;
}
