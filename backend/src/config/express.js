/**
 * @file express.js
 * @description Creates the express app and attaches all middlewares
 * @author Arkadip Bhattacharya(@darkmatter18)
 */

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');
const methodOverride = require('method-override');
const helmet = require('helmet');
const cors = require('cors');

const vars = require('./vars');


/**
* Express instance
*/
const app = express();

// Added morgan for logging HTTP request
app.use(morgan(vars.logs));

// Parse request body params and attach them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Compress the response in gzip for better performance
app.use(compression());

// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// Using Cross Origin Resource Sharing for APIs
app.use(cors());



module.exports = app;