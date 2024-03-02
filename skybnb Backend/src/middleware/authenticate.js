const { validateToken } = require('../utils/token')
const {STATUS_CODES}=require('../utils/constants')
const { responseBuilder } = require('../utils/response-builder')
const {CustomError}=require('../utils/custom-error')
const PUBLIC_PATHS = [
    '/v1/user/login',
    '/v1/user/register'
]

const authenticateApi = () => {
    return async (req, res, next) => {
        try {
            if (PUBLIC_PATHS.includes(req.baseUrl)) {
                return next();
            }
            const authHeader = req.headers['authorization'];

            if (authHeader == null) {
                throw new CustomError(STATUS_CODES.UNAUTHORIZED,'Token is missing in request','Autherization Error')
            }
            const token = authHeader.split(' ')[1];
            if (token == null) {
                throw new CustomError(STATUS_CODES.UNAUTHORIZED, 'Token is missing in request','Autherization Error')
            }
            const user = await validateToken(token)
            if (user) {
                req.user = user
            } else {
                throw new CustomError(STATUS_CODES.UNAUTHORIZED, 'Token is not valid', 'Autherization Error')
            }
            next();
        } catch (err) {
            res.status(STATUS_CODES.UNAUTHORIZED).send(responseBuilder(err));
        }
    }
}

module.exports = { authenticateApi }