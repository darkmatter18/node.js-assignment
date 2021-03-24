const joi = require('joi')

module.exports = {
    // POST /api/auth/register
    register: {
        body: {
            email: Joi.string()
                .email()
                .required(),
            password: Joi.string()
                .required()
                .min(6)
                .max(128),
        },
    },

    // POST /api/auth/login
    login: {
        body: {
            email: Joi.string()
                .email()
                .required(),
            password: Joi.string()
                .required()
                .max(128),
        },
    },
}