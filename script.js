<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculadora de Ganancias Compuestas</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Calculadora de Ganancias Compuestas</h1>
        <p>El interés compuesto es como sembrar semillas: plantas hoy y cada día tu cosecha crece más, permitiéndote sembrar aún más semillas y obtener una cosecha cada vez mayor con el tiempo.</p>
        
        <form id="calculatorForm">
            <div class="input-section">
                <label for="rangoActual">Selecciona tu Rango Actual:</label>
                <select id="rangoActual" required>
                    <option value="10000">Rango 20 - $10,000</option>
                    <option value="9000">Rango 19 - $9,000</option>
                    <option value="8000">Rango 18 - $8,000</option>
                    <option value="7000">Rango 17 - $7,000</option>
                    <option value="6000">Rango 16 - $6,000</option>
                    <option value="5000">Rango 15 - $5,000</option>
                    <option value="4500">Rango 14 - $4,500</option>
                    <option value="4000">Rango 13 - $4,000</option>
                    <option value="3500">Rango 12 - $3,500</option>
                    <option value="3000">Rango 11 - $3,000</option>
                    <option value="2500">Rango 10 - $2,500</option>
                    <option value="2000">Rango 9 - $2,000</option>
                    <option value="1500">Rango 8 - $1,500</option>
                    <option value="1000">Rango 7 - $1,000</option>
                    <option value="500">Rango 6 - $500 (Nota: Necesitas invitar a 3 personas para ascender de rango)</option>
                    <option value="400">Rango 5 - $400</option>
                    <option value="300">Rango 4 - $300</option>
                    <option value="200">Rango 3 - $200</option>
                    <option value="100">Rango 2 - $100</option>
                    <option value="50">Rango 1 - $50</option>
                </select>

                <label for="cicloMeses">Ciclo de Inversión (Meses):</label>
                <input type="number" id="cicloMeses" value="12" required min="1">

                <label for="usuariosPrimeraGeneracion">Número de usuarios de 1ª generación que invitarás al mes:</label>
                <input type="number" id="usuariosPrimeraGeneracion" value="1" required min="0">
                <small>Nota: Te llevarás el 4% de las ganancias de tus invitados directos.</small>

                <label for="usuariosSegundaGeneracion">Número de usuarios invitados por miembros de 1ª generación:</label>
                <input type="number" id="usuariosSegundaGeneracion" value="1" required min="0">
                <small>Nota: Te llevarás el 2% de las ganancias de los invitados de tus invitados.</small>

                <button type="button" id="calcularBtn">Calcular</button>
            </div>
        </form>

        <div class="results-section" id="resultsContainer" style="display: none;">
            <h2>Resultados del Cálculo</h2>
            <div class="result-highlight">
                <p><strong>Total de Ganancias del Usuario:</strong> <span id="totalGanancias"></span></p>
                <p><strong>Ganancias con Aportes Mensuales:</strong> <span id="gananciasAportes"></span></p>
                <p><strong>Ganancias con Aportes Mensuales (Mitad del Capital Inicial):</strong> <span id="gananciasAportesMitad"></span></p>
            </div>
            <p><strong>Capital Final:</strong> <span id="resultadoCapitalFinal"></span></p>
            <p><strong>Estrategia Sugerida:</strong> <span id="mensajeEstrategia"></span></p>

            <div id="desgloseContainer">
                <h3>Desglose de Operaciones</h3>
                <table id="desgloseOperaciones">
                    <thead>
                        <tr>
                            <th>Descripción</th>
                            <th>Monto</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Ganancia por Interés Compuesto</td>
                            <td id="gananciaInteresCompuesto"></td>
                        </tr>
                        <tr>
                            <td>Ganancia por 1ª Generación</td>
                            <td id="gananciaPrimeraGeneracion"></td>
                        </tr>
                        <tr>
                            <td>Ganancia por Invitados de 1ª Generación</td>
                            <td id="gananciaSegundaGeneracion"></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div id="tablaContainer">
                <h3>Tabla de Ganancias Acumuladas</h3>
                <table id="tablaGanancias">
                    <thead>
                        <tr>
                            <th>Mes</th>
                            <th>Usuarios 1ª Gen</th>
                            <th>Usuarios Invitados por 1ª Gen</th>
                            <th>Capital Propio</th>
                            <th>Ganancias 1ª Generación</th>
                            <th>Ganancias Invitados por 1ª Gen</th>
                            <th>Ganancias Totales</th>
                            <th>Ganancias por Interés Compuesto</th>
                            <th>Ganancias con Aportes Mensuales</th>
                            <th>Ganancias con Aportes (Mitad)</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
