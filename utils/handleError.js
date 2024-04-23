// Función para manejar los errores de la aplicación
const handleError = (res=null, message, code=403) => {

    // Se imprime el mensaje de error en la consola del servidor
    console.log(message);

    // Si se recibe un objeto res, se envía el mensaje de error al cliente
    if (res != null){
        res.status(code).send(message);
    }
}

module.exports = { handleError }
