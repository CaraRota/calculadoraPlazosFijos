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
        let renovacion = new Date((Date.now() + (dias * 24 * 60 * 60 * 1000))).toLocaleDateString(region)

        // alert("💹 Depositando $" + capital.toLocaleString(region) + ", obtendras $" + monto1.toLocaleString(region) + " al final del periodo de " + dias + " dias. De ese monto, recibiras $" + intereses + " en concepto de interes. Podras renovar este plazo fijo el dia " + renovacion)

        // Declaramos una variable que nos permita agregar los datos ingresados por el usuario
        const historial = new historialCalculadora(nombre, capital, monto1, intereses, dias, renovacion)
        historialCalculadoraArray.push(historial)
        // Tiramos un console.table para que se nos muestre el Array bonito por consola
        console.table(historialCalculadoraArray)

        // Agregamos nuestras consultas en una tabla que creamos dinamicamente en nuestro HTML
        const agregarHistorial = document.querySelector("#historial")
        const nuevoHistorial = document.createElement("tr")
        nuevoHistorial.classList.add("delete")
        nuevoHistorial.innerHTML = `<td class="column1 delete">${nombre}</td>
        <td class="column2 delete">${capital}</td>
        <td class="column3 delete">${monto1}</td>
        <td class="column4 delete">${intereses}</td>
        <td class="column5 delete">${dias}</td>
        <td class="column6 delete">${renovacion}</td>`

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
        const borrarHistorial = document.querySelectorAll(".delete")
        borrarHistorial.forEach((element) => {
            element.remove()
        })
        alert("🆑 Su historial de calculos ha sido borrado")
    }
    else {
        alert("❌ El historial de calculos ya se encuentra vacio.")
    }
}

// Llamamos a la funcion borrarArray mediante el boton de Borrar
const btnBorrar = document.querySelector("#btnBorrar")
btnBorrar.addEventListener("click", borarArray)

// // Funcion que busca las consultas por nombres ingresados
// const buscar = (event) => {
//     event.preventDefault()
//     const fieldBuscar = document.querySelector("#inputBuscar")
//     let busqueda = fieldBuscar.value
//     const ultimosTres = historialCalculadoraArray.reverse().filter((busqueda, index) => index < 3)

//     if (ultimosTres.length > 0) {
//         ultimosTres.forEach(element => {
//             element.innerHTML = `hola mundo`
//             form2.reset()

//         });
//     } else {
//         alert("❌ Aun nadie ha hecho consultas")
//         form2.reset()
//     }
// }

// // Llamamos a la funcion buscar mediante el boton de buscar
// const btnBuscar = document.querySelector("#form2")
// btnBuscar.addEventListener("submit", buscar)