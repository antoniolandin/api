const { commerce } = require('../../../models')
const { handleHttpError } = require('../../utils/handleError')
const { tokenSign } = require('../../utils/handleJwt')
const log = require('../../utils/handleConsoleLog')

// Función para darse de baja como comercio
delete_commerce = async (req, res) => {

    try {
        const { CIF } = req.body

        // Se comprueba que el CIF sea válido
        if (!CIF) {
            handleHttpError(res, 'El CIF es requerido', code=400)
            log(
                'Error al eliminar comercio: '.bgRed,
                JSON.stringify(req.body, null, 2).brightYellow,
                'El CIF es requerido'.brightRed
            )
        }

        // Se comprueba que el comercio exista
        const commerceExists = await commerce.findOne({ where: { CIF } })

        if (!commerceExists) {
            handleHttpError(res, 'El comercio no existe', code=404)
            log(
                'Error al eliminar comercio: '.bgRed,
                JSON.stringify(req.body, null, 2).brightYellow,
                'El comercio no existe'.brightRed
            )
        }

        // Se elimina el comercio
        await commerce.destroy({ where: { CIF } })

        return res.status(200).json({ message: 'Comercio eliminado' })
    }
    catch (error) {
        handleHttpError(res, error.message, code=400)
        log(
            'Error al eliminar comercio: '.bgRed,
            JSON.stringify(req.body, null, 2).brightYellow,
            error.message.brightRed
        )
    }
}

module.exports = delete_commerce 
