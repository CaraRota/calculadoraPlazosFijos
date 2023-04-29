// Configuramos la TNA
const tna = 0.91

// Definimos la region para determinar los separadores de miles
const region = "es-AR"

// Funcion para alertas de un solo boton (Solo el OK)
const alertas = (icon, titulo, texto, animation) => {
    Swal.fire({
        icon: icon,
        title: titulo,
        text: texto,
        showClass: {
            popup: animation
        },
        customClass: {
            confirmButton: "btn btn-dark m-3",
            denyButton: "btn btn-dark m-3"
        },
        buttonsStyling: false
    })
}

// Utilizamos la API de ambito.com
const apiUrl = "https://mercados.ambito.com/home/general"

fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
        const oficial = document.querySelector("#dolarOficial")
        oficial.innerHTML = `${data[0].nombre}: ${data[0].venta}`

        const informal = document.querySelector("#dolarInformal")
        informal.innerHTML = `${data[1].nombre}: ${data[1].venta}`

        const turista = document.querySelector("#dolarTurista")
        turista.innerHTML = `${data[2].nombre}: ${data[2].venta}`

        const ahorro = document.querySelector("#dolarAhorro")
        ahorro.innerHTML = `${data[3].nombre}: ${data[3].venta}`

        const mayorista = document.querySelector("#dolarMayorista")
        mayorista.innerHTML = `${data[4].nombre}: ${data[4].venta}`
    })

    // const mep = document.querySelector("#dolarMep")
    //     mep.innerHTML = `${data[2].compra}`

    //     const ccl = document.querySelector("#dolarCcl")
    //     ccl.innerHTML = `${data[2].compra}`