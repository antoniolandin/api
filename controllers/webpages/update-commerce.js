const { commerce } = require('../../models')
const { handleHttpError, handleError } = require('../../utils/handleError')
const { tokenSign } = require('../../utils/handleJwt')
const log = require('../../utils/handleConsoleLog')

// Función para registrar un comercio en la base de datos
updateCommerce = async (req, res) => {
    try{
        // Obtenemos el CIF del comercio a modificar
        const CIF = req.params.CIF
        
        // Obtenemos los datos del comercio a modificar
        const commerceData = req.body 

        // Buscamos el comercio en la base de datos
        const oldCommerce = await commerce.findOne({where: {CIF: CIF}})
        
        // Si el comercio no existe, devolvemos un error
        if(!oldCommerce){
            handleHttpError(res, 'El comercio no existe', 404)
        }
        else{
            const inmutableFields = ['CIF', 'numReviews', 'score']
            
            var message = ''
            var updated = false
            
            // Actualizamos los campos del comercio
            for (const key in commerceData) {
                if(!inmutableFields.includes(key)){
                    oldCommerce[key] = commerceData[key]
                    updated = true
                }
                else{
                    message += `El campo ${key} no puede ser modificado. \n`
                }
            }

            if(!updated){
                handleHttpError(res, 'No se ha modificado ningún campo', 400)
            }
            else{
                message += 'Comercio actualizado correctamente'
                
                await commerce.update(oldCommerce, {where: {CIF: CIF}})

                const data = {
                    msg: message
                }

                // Enviamos al cliente la respuesta
                res.status(200).json(data)
            }
        }
    }
    catch(error){
        handleError(res, error, 400)
    }
}

module.exports = updateCommerce
