const btnCalcular = document.querySelector("#form")
btnCalcular.addEventListener("submit", obtenerDatos)

const btnBorrar = document.querySelector("#btnBorrar")
btnBorrar.addEventListener("click", borrarArray)

const btnMisConsultas = document.querySelector("#btnMisConsultas")
btnMisConsultas.addEventListener("click", misConsultas)

const btnBorrarConsultas = document.querySelector("#btnBorrarConsultas")
btnBorrarConsultas.addEventListener("click", borrarConsultas)

const inputNombre = document.querySelector("#inputNombre")
const inputCapital = document.querySelector("#inputCapital")
const inputDias = document.querySelector("#inputDias")
const ultimaConsulta = document.querySelector("#ultimaConsulta")
const agregarHistorial = document.querySelector("#historial")
const mostrarConsultas = document.querySelector("#consultasCliente")
const btnConsultas = document.querySelector("#consultasCliente")

const agregarConsultas = () => {
    const historialJSON = JSON.parse(localStorage.getItem("historial"))
    // Mapeamos la consulta que obtenemos una vez parseado el localStorage
    const obtenerHistorial = historialJSON.map((consulta) => ({
        nombre: consulta.nombre,
        capital: consulta.capital,
        monto: consulta.monto,
        intereses: consulta.intereses,
        dias: consulta.dias,
        renovacion: consulta.renovacion
    }))
    // Generamos HTML dinamicamente para las filas de la tabla
    let filasTabla = ''
    for (const consulta of obtenerHistorial) {
        filasTabla += `
        <tr>
            <td class="column1">${consulta.nombre}</td>
            <td class="column2">${consulta.capital}</td>
            <td class="column3">${consulta.monto}</td>
            <td class="column4">${consulta.intereses}</td>
            <td class="column5">${consulta.dias}</td>
            <td class="column6">${consulta.renovacion}</td>
        </tr>
    `
    }

    // Actualizamos el contenido de la tabla con las filas generadas
    mostrarConsultas.innerHTML = `
    <div class="container py-4">
        <div class="limiter">
            <div class="container-table100 rounded">
                <div class="wrap-table100">
                    <div class="table100">
                        <table>
                            <thead id="encabezado">
                                <tr class="table100-head uppcercase">
                                    <th class="column1">Nombre</th>
                                    <th class="column2">Capital</th>
                                    <th class="column3">Monto</th>
                                    <th class="column4">Intereses</th>
                                    <th class="column5">Dias</th>
                                    <th class="column6">Renovacion</th>
                                </tr>
                            </thead>
                            <span class="historial uppcercase d-flex justify-content-center text-center text-light h4">
                                Mis Consultas
                            </span>
                            <tbody id="historial">
                                ${filasTabla}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
`
}

const agregarHistoriales = (nombre, capital, dias) => {
    // Convertimos la TNA en TEA con n capitalizaciones dependiendo de la cantidad de dias que deposite.
    const n = 360 / dias
    const tea = ((1 + tna / n) ** n) - 1
    let monto1 = parseFloat((calcularInteresCompuesto(capital, dias, tea)).toFixed(2))
    let intereses = (monto1 - capital).toLocaleString(region)
    let renovacion = new Date((Date.now() + (dias * 24 * 60 * 60 * 1000))).toLocaleDateString(region)
    // Mostramos en pantalla la consulta realizada por el cliente (que antes se hacia por alert)
    const datosUltimaConsulta = "💹 Depositando $" + capital.toLocaleString(region) + ", obtendras $" + monto1.toLocaleString(region) + " al final del periodo de " + dias + " dias. De ese monto, recibiras $" + intereses + " en concepto de interes. Podras renovar este plazo fijo el dia " + renovacion
    ultimaConsulta.innerHTML = `<h4 class="text-center mb-3">ULTIMA CONSULTA</h4>` + datosUltimaConsulta
    ultimaConsulta.classList.add("py-3")

    // Declaramos una variable que nos permita agregar los datos ingresados por el usuario
    const historial = new historialCalculadora(nombre, capital, monto1, intereses, dias, renovacion)
    historialCalculadoraArray.push(historial)

    // Guardamos los datos ingresados por el usuario en su Local Storage mediante la consulta de historialCalculadoraArray que guarda todas las consultas realizadas en la sesion
    const historialJSON = JSON.stringify(historialCalculadoraArray)
    localStorage.setItem("historial", historialJSON)

    // Agregamos nuestras consultas en una tabla que creamos dinamicamente en nuestro HTML (en un futuro esta tabla deberia conectarse con un backend para mostrar las consultas de todos los usuarios)
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