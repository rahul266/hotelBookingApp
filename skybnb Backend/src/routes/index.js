const { userRoutes } = require("./users")
const { bookingRoutes } = require("./bookings")

const applyRoutes = (router) => {
    userRoutes(router)
    bookingRoutes(router)
    return router    
}
module.exports = { applyRoutes }

