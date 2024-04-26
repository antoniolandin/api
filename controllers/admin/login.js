const { admin } = require('../../models')
const { handleHttpError } = require('../../utils/handleError')
const { encryptPassword, comparePassword } = require('../../utils/handlePassword')
const { tokenSign } = require('../../utils/handleJwt')
const colors = require('colors')
const log = require('../../utils/handleConsoleLog')

// Función para iniciar sesión (con email y contraseña)
login = async (req, res) => {
    
    try {
        // Buscamos al admin en la base de datos
        const adminData = await admin.findOne({
            where : {
                email: req.body.email
            }
        })

        // Verificamos si el admin existe
        if (!adminData) {
            // Mostramos en consola que el admin no existe 
            log(
                "Error en login admin:".bgRed,
                JSON.stringify(req.body, null, 2).brightYellow,
                "Admin ".red + req.body.email.toString().brightRed + " no existe".red
            )

            // Enviamos al cliente un mensaje de error
            handleHttpError(res, 'Admin no existe', 404)
            return
        }

        // Verificamos si la contraseña es correcta
        const passwordMatch = await comparePassword(req.body.password, adminData.password)

        if (!passwordMatch) {
            // Mostramos en consola que la contraseña es incorrecta
            log(
                "Error en login admin:".bgRed,
                JSON.stringify(req.body, null, 2).brightYellow,
                "Contraseña incorrecta".red
            )

            // Enviamos al cliente un mensaje de error
            handleHttpError(res, 'Contraseña incorrecta', 401)
            return
        }

        // Eliminamos la contraseña del objeto del admin (motivos de seguridad)
        adminData.set('password', undefined, { strict: false })

        // Creamos la respuesta que enviaremos al cliente
        const data = {
            token: tokenSign(adminData),
            admin: adminData
        }

        // Mostramos en consola que el admin ha iniciado sesión correctamente
        log(
            "Inicio de sesión exitoso:".bgGreen,
            JSON.stringify(req.body, null, 2).brightYellow,
            "Admin ".green + adminData.email.brightBlue + " ha iniciado sesión correctamente".green
        )

        // Enviamos al cliente el token y los datos del admin
        res.status(200).json(data)
    }
    catch (error) {
        // Mostramos en consola que ha ocurrido un error al iniciar sesión
        log(
            "Error en login admin:".bgRed,
            JSON.stringify(req.body, null, 2).brightYellow,
            error.message.brightRed
        )

        // Enviamos al cliente un mensaje de error
        handleHttpError(res, error.message, 401)
    }
}

module.exports = login
