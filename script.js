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

// Función para actualizar el capital inicial según el rango seleccionado
function actualizarCapital() {
    const rangoActual = parseInt(document.getElementById('rangoActual').value);
    const capitalInicial = capitalPorRango[rangoActual];
    document.getElementById('capitalInicial').value = capitalInicial;
}

// Función principal de cálculo
function calcular(event) {
    event.preventDefault();

    const rangoActual = parseInt(document.getElementById('rangoActual').value);
    let capital = capitalPorRango[rangoActual];
    const cicloMeses = parseInt(document.getElementById('cicloMeses').value);
    const interesMensual = 0.10; // 10% de interés mensual
    let siguienteRango = rangoActual;

    let totalGananciaInteres = 0;
    let gananciaBruta = 0;
    let ganancias1G = 0;
    let ganancias2G = 0;
    let gananciaInvitados2G = 0;
    let capitalFaltante = 1000000 - capital;

    for (let mes = 1; mes <= cicloMeses; mes++) {
        // Cálculo del interés compuesto mensual sobre el capital inicial
        const gananciaInteres = capital * interesMensual;
        gananciaBruta += gananciaInteres;
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
            ganancias1G += comisionInvitado;
            capital += comisionInvitado;

            // Generar ganancia para la segunda generación
            const comision2G = gananciaInvitado * 0.005; // 0.5% de las ganancias de segunda generación
            ganancias2G += comision2G;
            gananciaInvitados2G += comision2G;
        }

        // Calcular cuánto falta para llegar a $1,000,000
        capitalFaltante = 1000000 - capital;
    }

    // Estrategia recomendada para alcanzar $1,000,000
    const estrategia = capitalFaltante > 0 ? `Necesitas continuar invirtiendo para alcanzar $1,000,000. Podrías considerar aumentar tu inversión mensual o incrementar la cantidad de invitados.` : `¡Felicidades! Has alcanzado el capital de $1,000,000.`;

    // Mostrar resultados en el Pop-up
    document.getElementById('resultadoRango').textContent = siguienteRango;
    document.getElementById('resultadoCapitalFinal').textContent = `$${capital.toFixed(2)}`;
    document.getElementById('gananciaTotalInvitados').textContent = `$${(ganancias1G + ganancias2G).toFixed(2)}`;
    document.getElementById('mensajeCapital').textContent = `Ganancia bruta total: $${gananciaBruta.toFixed(2)}. Faltan $${capitalFaltante.toFixed(2)} para alcanzar $1,000,000.`;
    document.getElementById('mensajeEstrategia').textContent = estrategia;

    // Detalles de Generación 1 y Generación 2
    document.getElementById('ganancias1G').textContent = `Ganancias Generación 1: $${ganancias1G.toFixed(2)}`;
    document.getElementById('ganancias2G').textContent = `Ganancias Generación 2: $${gananciaInvitados2G.toFixed(2)}`;

    document.getElementById('popup').style.display = 'flex';
}

// Función para cerrar el Pop-up
function cerrarPopup() {
    document.getElementById('popup').style.display = 'none';
}
