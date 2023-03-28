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
let historialCalculadoraArray = []

// Verificamos que los prompts sean numeros mayores a cero
let validacion = true
let validacion1 = true
let validacion2 = true

// Funcion que nos permite cargar datos a traves de prompts en un array
function get_data() {
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
                            let monto1 = parseFloat((compuesto(capital, dias, tea)).toFixed(2))
                            let intereses = (monto1 - capital).toLocaleString(region)

                            alert("💹 Depositando $" + capital.toLocaleString(region) + ", obtendras $" + monto1.toLocaleString(region) + " al final del periodo de " + dias + " dias. De ese monto, recibiras $" + intereses + " en concepto de interes.")

                            // Declaramos una variable que nos permita agregar los datos ingresados por el usuario
                            const historial = new historialCalculadora(nombre, monto1, intereses, dias)
                            historialCalculadoraArray.push(historial)
                            // Tiramos un console.table para que se nos muestre el Array bonito por consola
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
    validacion = true
    validacion1 = true
    validacion2 = true
}
// Funcion que nos permite eliminar el historial de calculos realizado por los usuarios
function clear_array() {
    // Chequeamos que el historial de calculos tenga datos cargados
    if (historialCalculadoraArray.length > 0) {
        historialCalculadoraArray = []
        alert("🆑 Su historial de calculos ha sido borrado")
        // Chequeamos que el hitorial se haya borrado mediante con console.log (eliminar estas lineas una vez pasado el QA)
        console.log(historialCalculadoraArray)
    }
    else {
        alert("❌ El historial de calculos ya se encuentra vacio.")
    }
}