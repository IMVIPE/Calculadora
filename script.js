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
    const interesMensual = 0.15; // 15% de interés mensual
    let siguienteRango = rangoActual;

    let totalGananciaInteres = 0;
    let gananciaBruta = 0;
    let ganancias1G = 0;
    let ganancias2G = 0;
    let totalRecompensas = 0;
    let capitalFaltante = 1000000 - capital;

    for (let mes = 1; mes <= cicloMeses; mes++) {
        // Cálculo del interés compuesto mensual sobre el capital inicial
        const gananciaInteres = capital * interesMensual;
        totalGananciaInteres += gananciaInteres;

        // Distribución de ganancias
        const gananciaUsuario = gananciaInteres * 0.10; // 10% para el usuario
        const ganancia1G = gananciaInteres * 0.02; // 2% para la generación 1
        const ganancia2G = gananciaInteres * 0.01; // 1% para la generación 2
        const reinversion = gananciaInteres * 0.03; // 3% reinvertido
        totalRecompensas += gananciaUsuario;

        // Actualización de las ganancias por generación
        ganancias1G += ganancia1G;
        ganancias2G += ganancia2G;

        // Revisión para subir de rango
        while (siguienteRango < 20 && capital + reinversion >= capitalPorRango[siguienteRango + 1]) {
            siguienteRango++;
        }

        // Acumular el interés ganado y reinvertirlo
        capital += reinversion + gananciaUsuario;

        // Calcular cuánto falta para llegar a $1,000,000
        capitalFaltante = 1000000 - capital;
    }

    // Estrategia recomendada para alcanzar $1,000,000
    const estrategia = capitalFaltante > 0 ? `Necesitas continuar invirtiendo para alcanzar $1,000,000. Podrías considerar aumentar tu inversión mensual o incrementar la cantidad de invitados.` : `¡Felicidades! Has alcanzado el capital de $1,000,000.`;

    // Mostrar resultados en el Pop-up
    document.getElementById('resultadoRango').textContent = siguienteRango;
    document.getElementById('resultadoCapitalFinal').textContent = `$${capital.toFixed(2)}`;
    document.getElementById('mensajeCapital').textContent = `Ganancia bruta total: $${totalGananciaInteres.toFixed(2)}. Faltan $${capitalFaltante.toFixed(2)} para alcanzar $1,000,000.`;
    document.getElementById('mensajeEstrategia').textContent = estrategia;
    document.getElementById('totalRecompensas').textContent = `Recompensas totales: $${totalRecompensas.toFixed(2)}`;
    document.getElementById('ganancias1G').textContent = `$${ganancias1G.toFixed(2)}`;
    document.getElementById('ganancias2G').textContent = `$${ganancias2G.toFixed(2)}`;

    document.getElementById('popup').style.display = 'flex';
}

// Función para cerrar el Pop-up
function cerrarPopup() {
    document.getElementById('popup').style.display = 'none';
}

// Función para mostrar los detalles de las generaciones
function mostrarDetallesGeneraciones() {
    document.getElementById('resultadosGenerales').style.display = 'none';
    document.getElementById('detallesGeneraciones').style.display = 'block';
}

// Función para volver a los resultados generales
function volverResultadosGenerales() {
    document.getElementById('detallesGeneraciones').style.display = 'none';
    document.getElementById('resultadosGenerales').style.display = 'block';
}
