const userController = require('../controllers/users-controller')

const userRoutes = (app) => {
    app.post('/v1/user/register', userController.createUserController())
    app.post('/v1/user/login',userController.authenticateUser())
}

module.exports = { userRoutes }