// Formula de interes compuesto
const calcularInteresCompuesto = (capital, dias, tea) => {
    let monto = capital * ((1 + tea) ** (dias / 365))
    return monto
}

// Definimos un array vacio que almacenara los datos del historial de calculos realizado por el cliente
const historialCalculadoraArray = []

// Llamamos a la funcion obtenerDatos mediante el boton de submit (Calcular)
const obtenerDatos = (event) => {
    event.preventDefault()

    let nombre = inputNombre.value.trim().toUpperCase()
    let capital = parseFloat(inputCapital.value)
    let dias = parseInt(inputDias.value)

    if (nombre.length < 3) {
        alertas("error", "Error!", "Por favor ingrese un nombre con mas de 3 caracteres.", 'animate__animated animate__headShake')
    } else if (isNaN(capital) || capital <= 0) {
        alertas("error", "Error!", "Por favor ingresa un capital mayor a cero.", 'animate__animated animate__headShake')
    } else if (isNaN(dias) || dias <= 0) {
        alertas("error", "Error!", "Por favor ingresa un numero de dias mayor a cero.", 'animate__animated animate__headShake')
    } else {
        agregarHistoriales(nombre, capital, dias) // En DOM.js
    }
}

// Llamamos a la funcion borrarArray mediante el boton de Borrar
const borrarArray = () => {
    // Chequeamos que el historial de calculos tenga datos cargados
    if (historialCalculadoraArray.length > 0) {
        historialCalculadoraArray.length = 0
        const borrarHistorial = document.querySelectorAll(".delete")
        borrarHistorial.forEach((element) => {
            element.remove()
        })
        alertas("success", "Hecho!", "Su historial de calculos ha sido borrado", "animate__animated animate__bounceIn")
    }
    else {
        alertas("error", "Error!", "El historial de calculos ya se encuentra vacio.", "animate__animated animate__headShake")
    }
}

// Llamamos a la funcion consultas mediante el boton de Consultas
const misConsultas = () => {
    if (localStorage.length > 0) {
        agregarConsultas() //En DOM.js
    } else {
        alertas("error", "Error!", "Usted aun no ha realizado ninguna consulta.", "animate__animated animate__headShake")
    }
}

// // Llamamos a la funcion borrarConsultas mediante el boton de Borrar Consultas
const borrarConsultas = () => {
    if (localStorage.length > 0) {
        localStorage.clear()
        alertas("success", "Hecho!", "Su historial de consultas ha sido eliminado.", "animate__animated animate__bounceIn")
        // Eliminamos todos los hijos de #consultasCliente
        while (btnConsultas.firstChild) {
            btnConsultas.firstChild.remove()
        }
    } else {
        alertas("error", "Error!", "Usted aun no tiene ninguna consulta archivada.", "animate__animated animate__headShake")
    }
}