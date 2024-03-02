const { getModels } = require('../database')
const { CustomError } = require('../utils/custom-error')
const { Users } = getModels()
const { STATUS_CODES } = require('../utils/constants')
const { generateToken }=require('../utils/token')

exports.createUser = async (data) => {
    try {
        const { name, email, password } = data
        const user = await Users.create({
            name: name,
            email: email,
            password: password
        })
        return user
    } catch (error) {
        throw new CustomError(STATUS_CODES.BAD_REQUEST,
            'user might already exist',
            'validation error'
        );
    }
}

exports.authenticateUser = async (data) => {
    const { email, password } = data
    const user = await Users.findOne({ where: { email: email } });
    if (!user) {
        throw new CustomError(STATUS_CODES.BAD_REQUEST,
            'User does not exist',
            'validation error'
        );
    }
    if (await user.validatePassword(password)) {
        return { 'accessToken': await generateToken({email:user.email})}
    } else {
        throw new CustomError(STATUS_CODES.BAD_REQUEST,
            'Password is wrong',
            'validation error'
        );
    }
}