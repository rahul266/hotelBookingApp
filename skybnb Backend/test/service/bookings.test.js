const { sequelize, loadModels } = require('../../src/database')
loadModels(sequelize)
const bookingService = require('../../src/service/booking-service')


describe('test booking service', () => {
    it('should save student details', async (done) => {
        const data = await bookingService.getUserBookingHistory({
            "email":"rahul@gmail.com"
        })
        expect(data.data).toBe(expect.any(Array))
    })
})