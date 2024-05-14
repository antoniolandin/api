const { user } = require('../../models')
const { handleHttpError, handleError } = require('../../utils/handleError')

// Función para actualizar a un usuario en la base de datos
updateUser = async (req, res) => {
    try{
        // Obtenemos la id del usuario a actualizar
        const id = req.params.id
        
        // Obtenemos los datos del usuario a actualizar
        const userData = req.body 

        // Buscamos la web en la base de datos
        const oldUser = await user.findOne({where: {id: id}})
        
        // Si el usuario no existe, devolvemos un error
        if(!oldUser){
            handleHttpError(res, 'La web no existe', 404)
        }
        else{
            const inmutableFields = [
                'id',
                'createdAt',
                'updatedAt'
            ]

            // Comprobamos que no se estén modificando campos inmutables
            for (const field of inmutableFields){
                if(userData[field] !== undefined && userData[field] !== oldUser[field]){
                    handleHttpError(res, `No se puede modificar el campo ${field}`, 400)
                    return
                }
            }

            console.log(userData)

            // Actualizamos el usuario en la base de datos
            await oldUser.update(userData)

            // Enviamos al cliente la respuesta
            res.status(200).json(oldUser)
        }
    }
    catch(error){
        handleError(res, error, 400)
    }
}

module.exports = updateUser
