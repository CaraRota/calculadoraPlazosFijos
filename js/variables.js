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