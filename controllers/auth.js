const { userModel } = require('../models')
const { encryptPassword, comparePassword } = require('../utils/handlePassword')
const { tokenSign } = require('../utils/handleJwt')

register = async (req, res) => {
    const password = await encryptPassword(req.body.password)
    const body = { ...req.body, password }

    try {
        const userData = await userModel.create(body)

        userData.set('password', undefined, { strict: false })

        const data = {
            token: tokenSign(userData),
            user: userData
        }

        res.status(200).json(data)
    }
    catch (error) {
        return res.status(400).json({ message: error.message })
    }
    
}

module.exports = {
    register
}
