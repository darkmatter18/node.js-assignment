/**
 * @public
 * @file errorHandler.js
 * @description Error handler. Send stacktrace only during development
 * @author Arkadip Bhattacharya(@darkmatter18)
 */

const errorHandler = (err, req, res, next) => {
    const response = {
        code: err.status,
        message: err.message || httpStatus[err.status],
        errors: err.errors,
        stack: err.stack,
    };

    if (env !== 'development') {
        delete response.stack;
    }

    res.status(err.status);
    res.json(response);
};

module.exports = errorHandler