const { user } = require('../../models')
const { handleError } = require('../../utils/handleError')
const { tokenSign } = require('../../utils/handleJwt')
const colors = require('colors')
const log = require('../../utils/handleConsoleLog')

// Función para registrar un usuario en la base de datos
register = async (req, res) => {
    try {
        // Creamos al usuario en la base de datos
        const userData = await user.create(req.body)
        
        // Eliminamos la contraseña del objeto del usuario (motivos de seguridad)
        userData.set('password', undefined, { strict: false })
        
        // Creamos la respuesta que enviaremos al cliente
        const data = {
            token: tokenSign(userData),
            user: userData
        }
        
        // Mostramos en consola que el usuario ha sido registrado correctamente
        log(
            "Registro exitoso de usuario:".bgGreen,
            JSON.stringify(req.body, null, 2).brightYellow,
            "Usuario ".green + userData.email.brightBlue + " registrado correctamente".green
        )

        // Enviamos al cliente el token y los datos del usuario
        res.status(201).json(data)
    }
    catch (error) {
        handleError(res, req, title="Error al registrar usuario:", error, 400)
    } 
}

module.exports = register
