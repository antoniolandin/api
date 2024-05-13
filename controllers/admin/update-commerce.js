const { commerce } = require('../../models')
const { handleError } = require('../../utils/handleError')
const { tokenSign } = require('../../utils/handleJwt')
const log = require('../../utils/handleConsoleLog')

updateCommerce = async (req, res) => {
    try {
        // Obtenemos el CIF del comercio a través de la URL
        const CIF = req.params.CIF

        // Actualizamos el comercio en la base de datos
        const commerceUpdated = await commerce.update(req.body, {
            where: {
                CIF: CIF
            }
        })

        const data = {
            msg: "Comercio actualizado correctamente"
        }
        
        // Log de la actualización del comercio
        log(
            "El comercio ha sido correctamente actualizado:".bgGreen,
            JSON.stringify(req.body, null, 2).brightYellow,
            "Usuario ".green + CIF.brightBlue + " actualizado correctamente".green
        )

        // Enviamos al cliente el token y los datos del usuario
        res.status(200).json(data) 
        
    }
    catch (error) {
        handleError(res, req, title="Error al actualizar comercio:", error, 400)
    }
}

module.exports = updateCommerce

