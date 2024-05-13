const { commerce } = require('../../models')
const { handleHttpError } = require('../../utils/handleError')

const getCommercesCity = async (req, res) => {
    try {
        const city = req.params.city 
        const asc = req.query.asc
        
        if (asc === 'true' || asc === 'false') {
            const ascBool = asc === 'true'

            const commercesCity = await commerce.findAll({
                where: { city: city },
                order: [
                    ['scoring', ascBool ? 'ASC' : 'DESC']
                ]
            })

            res.status(200).json(commercesCity)
        }
        else {
            const commercesCity = await commerce.findAll({
                where: { city: city }
            })

            res.status(200).json(commercesCity)
        }

    } catch (error) {
        handleHttpError(res, error, 400)
    }
}

module.exports = getCommercesCity
