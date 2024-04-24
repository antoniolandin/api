const { userModel } = require('../models')

// Registramos un nuevo usuario
createUser = async (req, res) => {
    
    // Obtenemos el cuerpo de la petición (objeto JSON del usuario)
    const { body } = req
    
    // Creamos un nuevo usuario en la base de datos
    const data = await userModel.create(body)
    
    // Respondemos con el usuario creado
    res.send(data)
}

module.exports = { createUser }
