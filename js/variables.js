// Configuramos la TNA
const tna = 0.78

// Definimos la region para determinar los separadores de miles
const region = "es-AR"

const alertas = (imagen, titulo, texto) => {
    Swal.fire({
        imageUrl: imagen,
        title: titulo,
        text: texto
    })
}