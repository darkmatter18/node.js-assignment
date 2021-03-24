/**
 * @file passport.js
 * @description This file contains stategies for passport.js
 * @author Arkadip Bhattacharya(@darkmatter18)
 */


const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const vars = require('./vars')

const local = (username, password, done) => {
    // User.findOne({ username: username }, function (err, user) {
    //     if (err) { return done(err); }
    //     if (!user) {
    //         return done(null, false, { message: 'Incorrect username.' });
    //     }
    //     if (!user.validPassword(password)) {
    //         return done(null, false, { message: 'Incorrect password.' });
    //     }
    //     return done(null, user);
    // });
}

/**
 * JWT options
 * 
 * Contains:
 * 1. JWT serect key
 * 2. jwtFromRequest (jwt extraction method from a request)
 */
const jwtOptions = {
    secretOrKey: vars.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
};

/**
 * 
 * @param payload 
 * @param done 
 * @returns 
 */
const jwt = async (payload, done) => {

    // try {
    //     const user = await User.findById(payload.sub);
    //     if (user) return done(null, user);
    //     return done(null, false);
    // } catch (error) {
    //     return done(error, false);
    // }
};

exports.jwt = new JwtStrategy(jwtOptions, jwt)
exports.localStrategy = new LocalStrategy(local)
