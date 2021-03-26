/**
 * @file vars.js
 * @description This file contains all environment variables and exports that as an object
 * @author Arkadip Bhattacharya(@darkmatter18)
 */


const path = require('path');

/**
 * Getting the .env file and adding the envs to process.env
 */
if (process.env.NODE_ENV !== "production") {
  require('dotenv-safe').config({
    path: path.join(__dirname, '../../../.env'),
    sample: path.join(__dirname, './../../../.env.example'),
  });

}

module.exports = {
  emailConfig: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    username: process.env.EMAIL_USERNAME,
    password: process.env.EMAIL_PASSWORD,
  },
  env: process.env.NODE_ENV,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES,
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
  mongo: {
    uri: process.env.NODE_ENV === 'test' ? process.env.MONGO_URI_TESTS : process.env.MONGO_URI,
  },
  port: process.env.PORT || 8080
}