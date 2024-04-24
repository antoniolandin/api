// Función para manejar los errores de la aplicación
const handleHttpError = (res, message, code) => {
    res.status(code).json({ message })
}

module.exports = { handleHttpError }
 
