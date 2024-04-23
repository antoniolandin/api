const { commerceModel } = require('../models')
const { handleError } = require('../utils/handleError')

// 1. Obtener la lista de comercios y, opcionalmente (vía parámetro query), ordenarlos por el CIF ascendentemente
getCommerces = async (req, res) => {

    // Obtenemos el parámetro de query
    const ascending = req.query.asc

    // Obtenemos los comercios de la base de datos
    const data = await commerceModel.find({})

    // Si el parámetro de query es 'true', ordenamos los comercios por CIF
    if (ascending === 'true') {
        data.sort((a, b) => a.CIF.localeCompare(b.CIF))
        res.send({data})
    }
    else {
        res.send({data})
    }
}

// 2. Obtener un comercio por su CIF
getCommerce = async (req, res) => {

    // Obtenemos el CIF del parámetro de la URL
    const CIF = req.params.CIF
    
    // Si no se ha pasado el CIF, respondemos con un error
    if (!CIF) {
        handleError(res, 'No se ha pasado el CIF')
        return
    }
    
    // Buscamos el comercio en la base de datos
    const data = await commerceModel.findOne({ "CIF": CIF })

    // Si no se ha encontrado el comercio, respondemos con un error
    if (!data) {
        handleError(res, 'No se ha encontrado el comercio')
        return
    }

    res.send({data})
}

// 3. Guardar un comercio
const saveCommerce = async (req, res) => {

    // Obtenemos el cuerpo de la petición (objeto json del comercio)
    const { body } = req
    
    // Creamos el comercio en la base de datos
    const data = await commerceModel.create(body)
    
    // Respondemos con el comercio creado
    res.send(data)
}

// 4. Modificar un comecio a partir de su CIF
const updateCommerce = async (req, res) => {

    // Obtenemos el CIF del parámetro de la URL
    const CIF = req.params.CIF

    // Obtenemos el cuerpo de la petición (objeto json del comercio)
    const { body } = req

    // Buscamos el comercio en la base de datos
    const data = await commerceModel.findOne({ "CIF": CIF })

    // Si no se ha encontrado el comercio, respondemos con un error
    if (!data) {
        handleError(res, 'No se ha encontrado el comercio')
        return
    }

    // Actualizamos el comercio en la base de datos
    const updatedData = await commerceModel.findOneAndUpdate({ "CIF": CIF }, body, { new: true })
    
    // Respondemos con el comercio actualizado
    res.send(updatedData)
}

//5. Borrar un comercio a partir de su CIF, y permite eligir entre un borrado lógico o físico (via parámetro query)
const deleteCommerce = async (req, res) => {
    
        // Obtenemos el CIF del parámetro de la URL
        const CIF = req.params.CIF
    
        // Obtenemos el parámetro de query
        const logical = req.query.logical
    
        // Buscamos el comercio en la base de datos
        const data = await commerceModel.findOne({ "CIF": CIF })
    
        // Si no se ha encontrado el comercio, respondemos con un error
        if (!data) {
            handleError(res, 'No se ha encontrado el comercio')
            return
        }
    
        // Si el parámetro de query es 'true', borramos lógicamente el comercio
        if (logical === 'true') {
            const deletedData = await commerceModel.delete({ "CIF": CIF })
            res.send(deletedData)
        }
        // Si el parámetro de query es 'false', borramos físicamente el comercio
        else {
            const deletedData = await commerceModel.deleteOne({ "CIF": CIF })
            res.send(deletedData)
        }
    }

// Exportamos las funciones 
module.exports = {
    getCommerces,
    getCommerce,
    saveCommerce,
    updateCommerce,
    deleteCommerce,
}
