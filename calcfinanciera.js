// Configuramos la TNA
const tna = 0.78

// Definimos la region para determinar los separadores de miles
const region = "es-AR"

// Formula de interes compuesto
function compuesto(capital, dias, tea) {
    monto = capital * ((1 + tea) ** (dias / 365))
    return monto
}

// Definimos un constructor para determinar los valores a almacenar en el programa
class historialCalculadora {
    constructor(nombre, monto, intereses, plazo) {
        this.nombre = nombre;
        this.monto = monto;
        this.intereses = intereses;
        this.plazo = plazo;
    }
}

// Definimos un array vacio que almacenara los datos del historial de calculos realizado por el cliente
const historialCalculadoraArray = []

// Verificamos que los prompts sean numeros mayores a cero
let validacion = true
let validacion1 = true
let validacion2 = true

while (validacion) {
    let nombre = prompt("Cual es su gracia?").trim().toUpperCase()
    if (nombre.length < 3) {
        alert("❌ Por favor ingrese un nombre con mas de 3 caracteres")
    }
    else {
        while (validacion1) {
            let capital = parseFloat(prompt("🏦 Cuanto dinero quieres depositar?"))
            if (isNaN(capital) || capital <= 0) {
                alert("❌ Por favor ingresa un numero mayor a cero.")
            }
            else {
                while (validacion2) {
                    let dias = parseFloat(prompt("⌛ Durante cuantos dias te gustaria depositar?"))
                    if (isNaN(dias) || dias <= 0) {
                        alert("❌ Por favor ingresa un numero mayor a cero.")
                    }
                    else {
                        // Convertimos la TNA en TEA con n capitalizaciones dependiendo de la cantidad de dias que deposite.
                        const n = 360 / dias
                        const tea = ((1 + tna / n) ** n) - 1
                        let capital1 = capital.toLocaleString(region)
                        let monto1 = parseFloat((compuesto(capital, dias, tea)).toFixed(2)).toLocaleString(region)
                        let intereses = (parseFloat((compuesto(capital, dias, tea)).toFixed(2)) - capital).toLocaleString(region)

                        alert("💹 Depositando $" + capital1 + ", obtendras $" + monto1 + " al final del periodo de " + dias + " dias. De ese monto, recibiras $" + intereses + " en concepto de interes.")

                        // Necesitamos agregar en algun momento un prompt para pedirle al usuario que ingrese su nombre
                        const historial = new historialCalculadora(nombre, monto1, intereses, dias)
                        historialCalculadoraArray.push(historial)
                        console.table(historialCalculadoraArray)

                        validacion = false
                        validacion1 = false
                        validacion2 = false
                    }
                }
            }
        }
    }
}
