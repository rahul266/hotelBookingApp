const Joi = require('joi')

exports.createUserValidator = () => {
    return Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        password: Joi.string().required()
    })
}

exports.loginUserValidator = () => {
    return Joi.object({
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        password: Joi.string().required()
    })
}