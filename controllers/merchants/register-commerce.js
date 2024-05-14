const { commerce } = require('../../models')
const { handleError } = require('../../utils/handleError')
const { tokenSign } = require('../../utils/handleJwt')

// Función para registrar un comercio en la base de datos
const registerCommerce = async (req, res) => {
    try {
        // Creamos al comercio en la base de datos
        const commerceData = await commerce.create(req.body)

        // Creamos la página web del comercio en la base de datos
        await commerceData.createWebpage({})

        // Creamos la respuesta que enviaremos al cliente
        const data = {
            token: tokenSign(commerceData),
            commerce: commerceData
        }
        
        // Enviamos al cliente el token y los datos del comercio
        res.status(201).json(data)
    }
    catch (error) {
        // Enviamos al cliente un mensaje de error
        handleError(res, error, 400)
    } 
}

module.exports = registerCommerce
