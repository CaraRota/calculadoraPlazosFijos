// Configuramos la TNA
const tna = 0.78

// Definimos la region para determinar los separadores de miles
const region = "es-AR"

// Formula de interes compuesto
const calcularInteresCompuesto = (capital, dias, tea) => {
    let monto = capital * ((1 + tea) ** (dias / 365))
    return monto
}

// Definimos un constructor para determinar los valores a almacenar en el programa
class historialCalculadora {
    constructor(nombre, capital, monto, intereses, plazo, renovacion) {
        this.nombre = nombre
        this.capital = capital
        this.monto = monto
        this.intereses = intereses
        this.plazo = plazo
        this.renovacion = renovacion
    }
}

// Definimos un array vacio que almacenara los datos del historial de calculos realizado por el cliente
const historialCalculadoraArray = []

// Definimos una funcion para calcular el interes compuesto a traves de los datos ingresados por el usuario
const obtenerDatos = (event) => {
    event.preventDefault()

    const inputNombre = document.querySelector("#inputNombre")
    let nombre = inputNombre.value.trim().toUpperCase()
    const inputCapital = document.querySelector("#inputCapital")
    let capital = parseFloat(inputCapital.value)
    const inputDias = document.querySelector("#inputDias")
    let dias = parseInt(inputDias.value)

    if (nombre.length < 3) {
        alert("❌ Por favor ingrese un nombre con mas de 3 caracteres")
    } else if (isNaN(capital) || capital <= 0) {
        alert("❌ Por favor ingresa un capital mayor a cero.")
    } else if (isNaN(dias) || dias <= 0) {
        alert("❌ Por favor ingresa un numero de dias mayor a cero.")
    } else {
        // Convertimos la TNA en TEA con n capitalizaciones dependiendo de la cantidad de dias que deposite.
        const n = 360 / dias
        const tea = ((1 + tna / n) ** n) - 1
        let monto1 = parseFloat((calcularInteresCompuesto(capital, dias, tea)).toFixed(2))
        let intereses = (monto1 - capital).toLocaleString(region)
        let renovacion = new Date((Date.now() + dias)).toLocaleDateString(region)

        alert("💹 Depositando $" + capital.toLocaleString(region) + ", obtendras $" + monto1.toLocaleString(region) + " al final del periodo de " + dias + " dias. De ese monto, recibiras $" + intereses + " en concepto de interes. Podras renovar este plazo fijo el dia " + renovacion)

        // Declaramos una variable que nos permita agregar los datos ingresados por el usuario
        const historial = new historialCalculadora(nombre, capital, monto1, intereses, dias, renovacion)
        historialCalculadoraArray.push(historial)
        // Tiramos un console.table para que se nos muestre el Array bonito por consola
        console.table(historialCalculadoraArray)

        // Agregamos nuestras consultas en una tabla que creamos dinamicamente en nuestro HTML
        const agregarHistorial = document.querySelector("#historial")
        const nuevoHistorial = document.createElement("div")
        nuevoHistorial.innerHTML = `<div class="cell">
        <div class="col-2 column">${nombre}</div>
        <div class="col-2 column">${capital}</div>
        <div class="col-2 column">${monto1}</div>
        <div class="col-2 column">${intereses}</div>
        <div class="col-2 column">${dias}</div>
        <div class="col-2 column">${renovacion}</div>
        </div>`
        agregarHistorial.appendChild(nuevoHistorial)

        // Reseteamos el form para que se borren los datos ingresados
        form.reset()
    }
}

// Llamamos a la funcion obtenerDatos mediante el boton de submit (Calcular)
const btnCalcular = document.querySelector("#form")
btnCalcular.addEventListener("submit", obtenerDatos)

// Funcion que nos permite eliminar el historial de calculos realizado por los usuarios
const borarArray = () => {
    // Chequeamos que el historial de calculos tenga datos cargados
    if (historialCalculadoraArray.length > 0) {
        historialCalculadoraArray.length = 0
        alert("🆑 Su historial de calculos ha sido borrado")
        // Chequeamos que el hitorial se haya borrado mediante con console.log (eliminar estas lineas una vez pasado el QA)
        console.log(historialCalculadoraArray)
    }
    else {
        alert("❌ El historial de calculos ya se encuentra vacio.")
    }
}

// Funcion que filtra las ultimas tres consultas realizadas
const buscarUltimos = () => {
    const ultimosTres = historialCalculadoraArray.reverse().filter((_, index) => index < 3)

    if (ultimosTres.length > 0) {
        console.table(ultimosTres)
    } else {
        alert("❌ Aun nadie ha hecho consultas")
    }
}