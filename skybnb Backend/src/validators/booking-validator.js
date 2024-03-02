const Joi = require('joi');

exports.blockingDatesValidator = () => {
    return Joi.object({
        hotelId: Joi.string().required(),
        checkInDate: Joi.date().iso().required(),
        checkOutDate: Joi.date().iso().min(Joi.ref('checkInDate')).required(),
    })
}

exports.bookingDetailsValidator = () => {
    return Joi.object({
        hotelId: Joi.string().required(),
        checkInDate: Joi.date().iso().required(),
        checkOutDate: Joi.date().iso().min(Joi.ref('checkInDate')).required(),
        totalPrice: Joi.number().required()
    })
}

exports.bookedDatesValidator = () => {
    return Joi.object({
        UUID: Joi.string().required()
    })
}
