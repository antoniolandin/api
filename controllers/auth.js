const { userModel } = require('../models')
const { encryptPassword, comparePassword } = require('../utils/handlePassword')
const { tokenSign } = require('../utils/handleJwt')

register = async (req, res) => {

    // Obtenemos los datos del usuario que se quieren registrar
    const { body } = req

    try {
        // Creamos al usuario en la base de datos
        const userData = await userModel.create(body)
        
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
        return res.status(400).json({ message: error.message })
    } 
}

module.exports = {
    register
}
