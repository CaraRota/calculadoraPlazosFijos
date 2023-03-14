// Configuramos la TNA
const tna = 0.75;

// Definimos la region para determinar los separadores de miles
region = "es-AR"

// Formula de interes compuesto
function compuesto(capital, dias, tea) {
    monto = capital * ((1 + tea) ** (dias / 365))
    return monto
}

// Verificamos que los prompts sean numeros mayores a cero
validacion = true

while (validacion) {
    let capital = parseFloat(prompt("Cuanto dinero quieres depositar?"))
    if (isNaN(capital) || capital <= 0) {
        alert("Por favor ingresa un numero mayor a cero.")
        validacion = true
    }
    else {
        let dias = parseFloat(prompt("Durante cuantos dias te gustaria depositar?"))
        if (isNaN(dias) || dias <= 0) {
            alert("Por favor ingresa un numero mayor a cero.")
            validacion = true
        }
        else {
            // Convertimos la TNA en TEA con n capitalizaciones dependiendo de la cantidad de dias que deposite.
            const n = 360 / dias;
            const tea = ((1 + tna / n) ** n) - 1;
            alert("Depositando $" + capital.toLocaleString(region) + ", obtendras $" + parseFloat((compuesto(capital, dias, tea)).toFixed(2)).toLocaleString(region) + " al final del periodo de " + dias + " dias. De ese monto, recibiras $" + (monto.toFixed(2) - capital.toFixed(2)).toLocaleString(region) + " en concepto de interes.")
            validacion = false
        }
    }
}