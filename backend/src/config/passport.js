/**
 * @file passport.js
 * @description This file contains stategies for passport.js
 * @author Arkadip Bhattacharya(@darkmatter18)
 */


const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const vars = require('./vars')
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
