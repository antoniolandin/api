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
        
        // Enviamos al cliente la respuesta
        res.status(200).json(data) 
        
    }
    catch (error) {
        handleError(res, error, 400)
    }
}

module.exports = updateCommerce

