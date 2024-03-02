const { responseBuilder } = require('../utils/response-builder')
const bookingService = require('../service/booking-service')
const blockDatesSchema = require('../validators/booking-validator')
const { STATUS_CODES } = require('../utils/constants')

exports.blockDatesForUser = () => {
    return async (req, res) => {
        try {
            const { error, value } = blockDatesSchema.blockingDatesValidator().validate(req.body)
            if (error) {
                error.code = STATUS_CODES.BAD_REQUEST;
                res.status(STATUS_CODES.BAD_REQUEST).send(responseBuilder(error));
                return;
            }
            const data= await bookingService.blockDatesForPayment({ ...value, "email": req.user?.email })
            res.send(responseBuilder('', { data }))
        } catch (error) {
            _handleException(error, res);
        }
    }
}

exports.confirmBooking = () => {
    return async (req, res) => {
        try {
            const { error, value } = blockDatesSchema.bookingDetailsValidator().validate(req.body)
            if (error) {
                error.code = STATUS_CODES.BAD_REQUEST;
                res.status(STATUS_CODES.BAD_REQUEST).send(responseBuilder(error));
                return;
            }
            res.send(responseBuilder('', {
                data: await bookingService.confirmBooking({ ...value, "email": req.user?.email })
            }))
        } catch (error) {
            _handleException(error, res);
        }
    }
}

exports.getBookedDates = () => {
    return async (req, res) => {
        try {
            const { error, value } = blockDatesSchema.bookedDatesValidator().validate(req.query)
            if (error) {
                error.code = STATUS_CODES.BAD_REQUEST;
                res.status(STATUS_CODES.BAD_REQUEST).send(responseBuilder(error));
                return;
            }
            res.send(responseBuilder('', {
                data: await bookingService.getBookingDatesFromHotelUUID(value)
            }))
        } catch (error) {
            _handleException(error, res);
        }
    }
}

exports.getBookingHistory = () => {
    return async (req, res) => {
        try {
            res.send(responseBuilder('', {
                data: await bookingService.getUserBookingHistory(req.user)
            }))
        } catch (error) {
            _handleException(error, res);
        }
    }
}

const _handleException = (error, res) => {
    let customError = {
        code: STATUS_CODES.INTERNAL_ERROR,
        message: error.message
    };
    if (error.code) {
        customError.code = error.code;
    }
    res.status(customError.code).send(responseBuilder(customError));
}