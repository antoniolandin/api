const { handleHttpError } = require('../utils/handleError');
const { verifyToken } = require('../utils/handleJwt');

const authMiddleware = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return handleHttpError(res, 'No token provided', 401)
            return
        }

        const token = req.headers.authorization.split(' ').pop();

        const dataToken = await verifyToken(token);

        if (!dataToken.id) {
            return handleHttpError(res, 'Invalid token', 401)
            return
        }

        next()
    }
    catch (error) {
        return handleHttpError(res, error.message, 401)
    }
}

module.exports = authMiddleware;
