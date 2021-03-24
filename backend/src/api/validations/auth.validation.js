const Joi = require('joi')

module.exports = {
    // POST /api/auth/register
    register: {
        body: Joi.object({
            email: Joi.string()
                .email()
                .required(),
            password: Joi.string()
                .required()
                .min(6)
                .max(128),
        }),
    },

    // POST /api/auth/login
    login: {
        body: Joi.object({
            email: Joi.string()
                .email()
                .required(),
            password: Joi.string()
                .required()
                .max(128),
        })
    },
    // POST /api/auth/refresh
    refresh: {
        body: Joi.object({
            email: Joi.string()
                .email()
                .required(),
            refreshToken: Joi.string().required(),
        })
    },
}