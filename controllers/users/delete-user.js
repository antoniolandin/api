const { user } = require('../../models')
const { handleHttpError, handleError } = require('../../utils/handleError')

// Función para eliminar un usuario
deleteUser = async (req, res) => {
    try{
        const id = req.params.id

        // Comprobamos si el usuario existe
        const userExists = await user.findByPk(id)

        if (!userExists) {
            handleHttpError(res, 'Usuario no encontrado', 404)
            return
        }

        // Eliminamos el usuario
        await user.destroy({
            where: {
                id: id
            }
        })

        res.status(200).json({
            message: 'Usuario eliminado'
        })

    } catch (error) {
        handleError(res, error)
    }
}

module.exports = deleteUser
