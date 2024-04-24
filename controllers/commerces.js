const { commerceModel } = require('../models')
const { handleHttpError } = require('../utils/handleError')

const createCommerce = async (req, res) => {
    try {
        const commerce = await commerceModel.create(req.body)
        res.status(201).json(commerce)
    } catch (error) {
        handleHttpError(res, error)
    }
}

// Exportamos las funciones 
module.exports = {
    createCommerce
}
