const { userModel } = require('../models')
const { handleHttpError } = require('../utils/handleError')
const { encryptPassword, comparePassword } = require('../utils/handlePassword')
const { tokenSign } = require('../utils/handleJwt')

register = async (req, res) => {
    try {
        // Creamos al usuario en la base de datos
        const userData = await userModel.create(req.body)
        
        // Eliminamos la contraseña del objeto del usuario (motivos de seguridad)
        userData.set('password', undefined, { strict: false })
        
        // Creamos la respuesta que enviaremos al cliente
        const data = {
            token: tokenSign(userData),
            user: userData
        }
        
        // Mostramos en consola que el usuario ha sido registrado correctamente
        console.log(`Usuario ${userData.email} registrado correctamente`)
        // Enviamos al cliente el token y los datos del usuario
        res.status(201).json(data)
    }
    catch (error) {
        // Mostramos en consola que ha ocurrido un error al registrar el usuario
        console.log(`Error al registrar usuario:\n${error.message}`)
        // Enviamos al cliente un mensaje de error
        handleHttpError(res, error.message, 400)
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
            console.log(`Usuario ${req.body.id} no existe
            `)
            // Enviamos al cliente un mensaje de error
            handleHttpError(res, 'Usuario no existe', 404)
            return
        }
    }
    catch (error) {
        // Mostramos en consola que ha ocurrido un error al iniciar sesión
        console.log(`Error al iniciar sesión:\n${error.message}`)
        // Enviamos al cliente un mensaje de error
        handleHttpError(res, error.message, 400)
    }
}

module.exports = {
    register,
    login
}
