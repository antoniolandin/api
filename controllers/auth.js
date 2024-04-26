const { user } = require('../models')
const { handleHttpError } = require('../utils/handleError')
const { encryptPassword, comparePassword } = require('../utils/handlePassword')
const { tokenSign } = require('../utils/handleJwt')
const colors = require('colors')

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
        console.log("Usuario ".green + userData.email.brightBlue + " registrado correctamente".green)
        // Enviamos al cliente el token y los datos del usuario
        res.status(201).json(data)
    }
    catch (error) {
        // Mostramos en consola que ha ocurrido un error al registrar el usuario
       
        // Extraemos todos los errores del objeto error
        errores = error.errors.map(e => e.message)

        // Juntamos todos los errores en un solo string
        mensaje_error = errores.join('\n')

        console.log("Error al registrar usuario:".bgRed)
        console.log(mensaje_error.brightRed)        

        // Enviamos al cliente un mensaje de error
        handleHttpError(res, mensaje_error, 400)
    } 
}

login = async (req, res) => {
    try {
        // Buscamos al usuario en la base de datos
        const userData = await userModel.findOne({
            id: req.body.id
        })

        // Verificamos si el usuario existe
        if (!userData) {
            // Mostramos en consola que el usuario no existe
            console.log("Usuario ".red + req.body.id.toString().brightRed + " no existe".red
            )
            // Enviamos al cliente un mensaje de error
            handleHttpError(res, 'Usuario no existe', 404)
            return
        }

        // Verificamos si la contraseña es correcta
        const passwordMatch = await comparePassword(req.body.password, userData.password)

        if (!passwordMatch) {
            // Mostramos en consola que la contraseña es incorrecta
            console.log("Contraseña incorrecta".red)
            // Enviamos al cliente un mensaje de error
            handleHttpError(res, 'Contraseña incorrecta', 401)
            return
        }

        // Eliminamos la contraseña del objeto del usuario (motivos de seguridad)
        userData.set('password', undefined, { strict: false })

        // Creamos la respuesta que enviaremos al cliente
        const data = {
            token: tokenSign(userData),
            user: userData
        }

        // Mostramos en consola que el usuario ha iniciado sesión correctamente
        console.log("Usuario ".green + userData.email.brightBlue + " ha iniciado sesión correctamente".green)

        // Enviamos al cliente el token y los datos del usuario
        res.status(200).json(data)
    }
    catch (error) {
        // Mostramos en consola que ha ocurrido un error al iniciar sesión
        console.log("Error al iniciar sesión:\n".red + error.message.brightRed)
        // Enviamos al cliente un mensaje de error
        handleHttpError(res, error.message, 400)
    }
}

module.exports = {
    register,
    login
}
