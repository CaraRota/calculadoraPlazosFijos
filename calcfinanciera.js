let capital = prompt("Cuanto dinero quieres depositar?")
let dias = prompt("Durante cuantos dias te gustaria depositar?")

// Configuramos la TNA
const tna = 0.75;

// Convertimos la TNA en TEA con n capitalizaciones dependiendo de la cantidad de dias que deposite.
const n = 360 / dias;
const tea = ((1 + tna / n) ** n) - 1;

// Verificamos que los prompts sean numeros mayores a cero
if (capital > 0 && dias > 0) {
    function compuesto(capital, dias, tea) {
        // Formula de interes compuesto
        monto = capital * ((1 + tea) ** (dias / 365))
        return monto
    }
}
else {
    alert("Por favor ingrese un numero mayor a cero.")
}

alert("Depositando $" + capital + ", obtendras $" + compuesto(capital, dias, tea).toFixed(2) + " al final del periodo de " + dias + " dias. De ese monto, recibiras $" + (monto - capital).toFixed(2) + " en concepto de interes.")