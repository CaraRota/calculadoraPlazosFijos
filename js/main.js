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
        alertas("error", "Error!", "Por favor ingrese un nombre con mas de 3 caracteres.", "animate__animated animate__headShake")
    } else if (isNaN(capital) || capital <= 0) {
        alertas("error", "Error!", "Por favor ingresa un capital mayor a cero.", "animate__animated animate__headShake")
    } else if (isNaN(dias) || dias <= 0) {
        alertas("error", "Error!", "Por favor ingresa un numero de dias mayor a cero.", "animate__animated animate__headShake")
    } else {
        agregarHistoriales(nombre, capital, dias) // En DOM.js
    }
}
// Llamamos a la funcion borrarArray mediante el boton de Borrar
const borrarArray = () => {
    // Chequeamos que el historial de calculos tenga datos cargados
    if (historialCalculadoraArray.length > 0) {
        Swal
            .fire({
                title: "Esta seguro?",
                text: "Perderas todos los datos!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Si, eliminarlo!",
                cancelButtonText: "Cancelar",
                customClass: {
                    confirmButton: "btn btn-danger m-3",
                    cancelButton: "btn btn-secondary m-3"
                },
                buttonsStyling: false
            })
            .then((result) => {
                if (result.isConfirmed) {
                    historialCalculadoraArray.length = 0
                    const borrarHistorial = document.querySelectorAll(".delete")
                    borrarHistorial.forEach((element) => {
                        element.remove()
                    })
                    alertas("success", "Hecho!", "Su historial de calculos ha sido borrado", "animate__animated animate__bounceIn")
                }
            })
    }
    else {
        alertas("error", "Error!", "El historial de calculos ya se encuentra vacio.", "animate__animated animate__headShake")
    }
}

// Llamamos a la funcion consultas mediante el boton de Consultas
const misConsultas = () => {
    // Ejemplo de operador ternario
    localStorage.length > 0 ? agregarConsultas() : alertas("error", "Error!", "Usted aun no ha realizado ninguna consulta.", "animate__animated animate__headShake")
}

// // Llamamos a la funcion borrarConsultas mediante el boton de Borrar Consultas
const borrarConsultas = () => {
    if (localStorage.length > 0) {
        Swal
            .fire({
                title: "Esta seguro?",
                text: "Perderas todos los datos!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Si, eliminarlo!",
                cancelButtonText: "Cancelar",
                customClass: {
                    confirmButton: "btn btn-danger m-3",
                    cancelButton: "btn btn-secondary m-3"
                },
                buttonsStyling: false
            })
            .then((result) => {
                if (result.isConfirmed) {
                    localStorage.clear()
                    // Eliminamos todos los hijos de #consultasCliente
                    while (btnConsultas.firstChild) {
                        btnConsultas.firstChild.remove()
                    }
                    alertas("success", "Hecho!", "Su historial de consultas ha sido eliminado.", "animate__animated animate__bounceIn")
                }
            })
    } else {
        alertas("error", "Error!", "Usted aun no tiene ninguna consulta archivada.", "animate__animated animate__headShake")
    }
}

// COMIENZO SECCION FETCH: CAROUSEL CON COTIZACIONES EN TIEMPO REAL DEL TIPO DE CAMBIO UTILIZANDO APIs DE AMBITO.COM
const cotizacionesGenerales = () => {
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            const oficial = document.querySelector("#dolarOficial")
            data[0]["class-variacion"] == "down" ? oficial.innerHTML = `<img src="../img/arrow-down.png" alt="Arrow Down"> ${data[0].nombre}: $${data[0].venta}` : oficial.innerHTML = `<img src="../img/arrow-up.png" alt="Arrow Up"> ${data[0].nombre}: $${data[0].venta}`

            const informal = document.querySelector("#dolarInformal")
            data[1]["class-variacion"] == "down" ? informal.innerHTML = `<img src="../img/arrow-down.png" alt="Arrow Down"> ${data[1].nombre}: $${data[1].venta}` : informal.innerHTML = `<img src="../img/arrow-up.png" alt="Arrow Up"> ${data[1].nombre}: $${data[1].venta}`

            const turista = document.querySelector("#dolarTurista")
            data[2]["class-variacion"] == "down" ? turista.innerHTML = `<img src="../img/arrow-down.png" alt="Arrow Down"> ${data[2].nombre}: $${data[2].venta}` : turista.innerHTML = `<img src="../img/arrow-up.png" alt="Arrow Up"> ${data[2].nombre}: $${data[2].venta}`

            const ahorro = document.querySelector("#dolarAhorro")
            data[3]["class-variacion"] == "down" ? ahorro.innerHTML = `<img src="../img/arrow-down.png" alt="Arrow Down"> ${data[3].nombre}: $${data[3].venta}` : ahorro.innerHTML = `<img src="../img/arrow-up.png" alt="Arrow Up"> ${data[3].nombre}: $${data[3].venta}`

            const mayorista = document.querySelector("#dolarMayorista")
            data[4]["class-variacion"] == "down" ? mayorista.innerHTML = `<img src="../img/arrow-down.png" alt="Arrow Down"> ${data[4].nombre}: $${data[4].venta}` : mayorista.innerHTML = `<img src="../img/arrow-up.png" alt="Arrow Up"> ${data[4].nombre}: $${data[4].venta}`
        })
        // Agregamos un catch para controlar algun error al cargar la API
        .catch((error) => {
            console.error("Error al cargar la API General", error)
        })
}

const cotizacionesMep = () => {
    fetch(apiUrl2)
        .then((response) => response.json())
        .then((data) => {
            const mep = document.querySelector("#dolarMep")
            data["class-variacion"] == "down" ? mep.innerHTML = `<img src="../img/arrow-down.png" alt="Arrow Down"> Dolar MEP: $${data.venta}` : mep.innerHTML = `<img src="../img/arrow-up.png" alt="Arrow Up"> Dolar MEP: $${data.venta}`
        })
        .catch((error) => {
            console.error("Error al cargar la API de MEP", error)
        })
}

const cotizacionesCcl = () => {
    fetch(apiUrl3)
        .then((response) => response.json())
        .then((data) => {
            const ccl = document.querySelector("#dolarCcl")
            data["class-variacion"] == "down" ? ccl.innerHTML = `<img src="../img/arrow-down.png" alt="Arrow Down"> Dolar CCL: $${data.venta}` : ccl.innerHTML = `<img src="../img/arrow-up.png" alt="Arrow Up"> Dolar CCL: $${data.venta}`
        })
        .catch((error) => {
            console.error("Error al cargar la API de CCL", error)
        })
}

// Utilizamos la API general de ambito.com (esta API no incluye CCL y MEP, estos datos deberemos obtenerlos de otras urls)
const apiUrl = "https://mercados.ambito.com/home/general"

const refreshTimeout = 60000 //Actualizamos cada 60s

// Creamos un infinite loop con setTimeout y llamando a una funcion que llame a cotizacionesGenerales() para que se actualice la cotizacion cada refreshTimeout segundos
// Funcion "loop refresh"
const actualizarCotizaciones = () => {
    cotizacionesGenerales()
    setTimeout(() => {
        actualizarCotizaciones()
    }, refreshTimeout)
}

actualizarCotizaciones()

// Utilizamos otra API para atrapar el dolar MEP
const apiUrl2 = "https://mercados.ambito.com//dolarrava/mep/variacion"

const actualizarCotizacionesMep = () => {
    cotizacionesMep()
    setTimeout(() => {
        actualizarCotizacionesMep()
    }, refreshTimeout)
}

actualizarCotizacionesMep()

// Utilizamos otra API para atrapar el dolar CCL
const apiUrl3 = "https://mercados.ambito.com//dolarrava/cl/variacion"

const actualizarCotizacionesCcl = () => {
    cotizacionesCcl()
    setTimeout(() => {
        actualizarCotizacionesCcl()
    }, refreshTimeout)
}
actualizarCotizacionesCcl()

// FIN SECCION FETCH: CAROUSEL CON COTIZACIONES EN TIEMPO REAL DEL TIPO DE CAMBIO UTILIZANDO APIs DE AMBITO.COM