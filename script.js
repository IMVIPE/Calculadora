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
    let ganancias1G = 0;
    let ganancias2G = 0;

    for (let mes = 1; mes <= cicloMeses; mes++) {
        // Cálculo del interés compuesto mensual
        const gananciaInteres = capital * interesMensual;
        totalGananciaInteres += gananciaInteres;

        // Revisión para subir de rango
        while (siguienteRango < 20 && capital + gananciaInteres >= capitalPorRango[siguienteRango + 1]) {
            siguienteRango++;
        }

        // Acumular el interés ganado
        capital += gananciaInteres;

        // Ganancias por invitado de 2 rangos inferiores
        if (siguienteRango > 2) {
            const rangoInvitado = siguienteRango - 2;
            const gananciaInvitado = capitalPorRango[rangoInvitado] * interesMensual;
            const comisionInvitado = gananciaInvitado * 0.12; // 12% de la ganancia del invitado
            capital += comisionInvitado;
        }
    }

    // Mostrar Resultados en el Pop-up
    document.getElementById('resultadoRango').textContent = siguienteRango;
    document.getElementById('resultadoCapitalFinal').textContent = `$${capital.toFixed(2)}`;
    document.getElementById('gananciaTotalInvitados').textContent = `$${(capital - capitalPorRango[rangoActual] - totalGananciaInteres).toFixed(2)}`;
    document.getElementById('mensajeCapital').textContent = `Has alcanzado el Rango ${siguienteRango} con una ganancia total de interés compuesto de $${totalGananciaInteres.toFixed(2)}.`;

    document.getElementById('popup').style.display = 'flex';
}

// Función para Cerrar el Pop-up
function cerrarPopup() {
    document.getElementById('popup').style.display = 'none';
}
