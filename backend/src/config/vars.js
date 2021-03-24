module.exports = {
    jwtSecret: process.env.JWT_SECRET,
    logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev'
}