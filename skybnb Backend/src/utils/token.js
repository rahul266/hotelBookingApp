const jwt = require('jsonwebtoken');
const {secretKey}=require('../config/config.js')

exports.generateToken = async (data) => {
    return jwt.sign(data, secretKey, { expiresIn: '1d' })
}

exports.validateToken = async (token) => {
    try {
        const decoded = await jwt.verify(token, secretKey);
        return decoded;
    } catch (err) {
        return;
    }
}