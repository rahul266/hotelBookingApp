const bookingController = require('../controllers/booking-controller')

const bookingRoutes = (app) => {
    app.post('/v1/booking/block-dates', bookingController.blockDatesForUser())
    app.post('/v1/booking/confirm-booking', bookingController.confirmBooking())
    app.get('/v1/booking/booked-dates', bookingController.getBookedDates())
    app.get('/v1/booking/booking-history',bookingController.getBookingHistory())
}

module.exports = { bookingRoutes }