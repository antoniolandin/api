const { user } = require('../../models')
const { handleHttpError } = require('../../utils/handleError')
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

        // Los errores de validación de Sequelize vienen en un objeto error.errors (lista de errores)
        if (error.errors) {
            // Extraemos todos los errores del objeto error
            errores = error.errors.map(e => e.message)

            // Juntamos todos los errores en un solo string
            mensaje_error = errores.join('\n')
        }
        else {
            // Si no hay errores de validación, mostramos el mensaje de error normal
            mensaje_error = error.message
        }
        
        // Mostramos en consola que ha ocurrido un error al registrar el usuario
        log(
            "Error al registrar usuario:".bgRed,
            JSON.stringify(req.body, null, 2).brightYellow,
            mensaje_error.brightRed
        )
               
        // Enviamos al cliente un mensaje de error
        handleHttpError(res, mensaje_error, 400)
    } 
}

module.exports = register
