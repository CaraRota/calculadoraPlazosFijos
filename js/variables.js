// Configuramos la TNA
const tna = 0.78

// Definimos la region para determinar los separadores de miles
const region = "es-AR"

// Funcion para alertas de un solo boton (OK)
const alertas = (icon, titulo, texto, animation) => {
    Swal.fire({
        icon: icon,
        title: titulo,
        text: texto,
        showClass: {
            popup: animation
        },
        customClass: {
            confirmButton: "btn btn-outline-danger pushable front m-3",
            denyButton: "btn btn-outline-danger pushable front m-3"
        },
        buttonsStyling: false
    })
}