const { getModels } = require('../database')
const { CustomError } = require('../utils/custom-error')
const { Users, Hotels,BlockingTable,Bookings } = getModels()
const { STATUS_CODES } = require('../utils/constants')
const { sequelize } = require('../database')
const { Op } = require('sequelize');

exports.blockDatesForPayment = async (data) => { 
    const user = await Users.findOne({ where: { email: data?.email } })
    const hotel = await await Hotels.findOne({ where: { UUID: data?.hotelId } })
    const t = await sequelize.transaction();
    try {
        const datesBlocked = await BlockingTable.create({
            userId: user?.id,
            hotelId: hotel?.id,
            checkInDate: data?.checkInDate,
            checkOutDate: data?.checkOutDate,
        }, { transaction: t });

        await t.commit();
        return datesBlocked
    } catch (error) {
        await t.rollback();
        throw new CustomError(STATUS_CODES.CONFLICT,
            'Sorry! Other user blocked these for payment'
        )
    }
}

exports.confirmBooking = async (data) => {
    const user = await Users.findOne({ where: { email: data?.email } })
    const hotel = await await Hotels.findOne({ where: { UUID: data?.hotelId } })
    const t = await sequelize.transaction();
    try {
        const booking = await Bookings.create({
            userId: user?.id,
            hotelId: hotel?.id,
            checkInDate: data?.checkInDate,
            checkOutDate: data?.checkOutDate,
            totalPrice: data?.totalPrice
        }, { transaction: t });
        await BlockingTable.destroy({
            where: {
                userId: user?.id,
                hotelId: hotel?.id,
                checkInDate: data?.checkInDate,
                checkOutDate: data?.checkOutDate,
            }
        }, { transaction: t })
        await t.commit();
        return booking
    } catch (error) {
        await t.rollback();
        throw new CustomError(STATUS_CODES.CONFLICT,
            'somthing went wrong'
        )
    }
}

exports.getBookingDatesFromHotelUUID = async (data) => {
    try {
        const hotel = await Hotels.findOne({
            where: { UUID: data?.UUID }
        })
        if (!hotel) {
            return []
        }
        const today = new Date();
        const bookedEntries = await Bookings.findAll({
            where: {
                hotelId: hotel?.id,
                checkOutDate: {
                    [Op.gt]: today,
                },
            },
            attributes: ['checkInDate', 'checkOutDate']
        });
        const blockedEntries = await BlockingTable.findAll({
            where: {
                hotelId: hotel?.id,
                checkOutDate: {
                    [Op.gt]: today,
                },
            },
            attributes: ['checkInDate', 'checkOutDate']
        })
        const allDates = [
            ...bookedEntries.map((entry) => ({ checkIn: entry.checkInDate, checkOut: entry.checkOutDate })),
            ...blockedEntries.map((entry) => ({ checkIn: entry.checkInDate, checkOut: entry.checkOutDate })),
        ];
        return allDates;
    } catch (error) {
        throw new CustomError(STATUS_CODES.BAD_REQUEST, error)
    }
}

exports.getUserBookingHistory = async(data) => {
    try {
        console.log(data)
        const user = await Users.findOne({ where: { email: data?.email } })
        console.log(data)
        const bookedEntries = await Bookings.findAll({
            where: {
                userId: user?.id
            },
            include: [
                {
                    model: Hotels,
                    as: 'hotel',
                    attributes: ['name', 'city'] 
                }
            ],
            order: [
                ['id', 'DESC']
            ]
        });
        return bookedEntries
    } catch (error) {
        throw new CustomError(STATUS_CODES.BAD_REQUEST,error
        )
    }
}
