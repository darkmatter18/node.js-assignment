const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const vars = require('./vars')

const jwtOptions = {
    secretOrKey: vars.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
};

const local = (username, password, done) => {
    User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    });
}

/**
 * 
 * @param {} payload 
 * @param {} done 
 * @returns 
 */
const jwt = async (payload, done) => {
    try {
        const user = await User.findById(payload.sub);
        if (user) return done(null, user);
        return done(null, false);
    } catch (error) {
        return done(error, false);
    }
};

exports.jwt = new JwtStrategy(jwtOptions, jwt)
exports.localStrategy = new LocalStrategy(local)
