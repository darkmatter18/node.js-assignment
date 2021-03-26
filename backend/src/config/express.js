/**
 * @file express.js
 * @description Creates the express app and attaches all middlewares
 * @author Arkadip Bhattacharya(@darkmatter18)
 */

const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const methodOverride = require('method-override');
const helmet = require('helmet');
const cors = require('cors');
const passport = require('passport')
const passportStategies = require('./passport')
const path = require('path');
const { expressCspHeader, INLINE, NONE, SELF } = require('express-csp-header');


const vars = require('./vars');
const router = require('../api/routes');
const errors = require('./../errors')
const errorHandler = require('./../errors/errorHandler')
const client = require('../client')


/**
* Express instance
*/
const app = express();

// Added morgan for logging HTTP request
app.use(morgan(vars.logs));

// Parse request body params and attach them to req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Compress the response in gzip for better performance
app.use(compression());

// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

app.use(expressCspHeader({
    directives: {
        'connect-src': [SELF, INLINE, 'https://newsapi.org'],
        'default-src': [SELF],
        'font-src': [SELF, 'https://fonts.gstatic.com',  'https://fonts.googleapis.com'],
        'script-src': [SELF, INLINE, 'somehost.com'],
        'style-src': [SELF, INLINE, 'https://fonts.googleapis.com'],
        'img-src': [SELF, 'https://source.unsplash.com', 'https://images.unsplash.com'],
        'worker-src': [NONE],
        'block-all-mixed-content': true
    }
}));


// Using Cross Origin Resource Sharing for APIs
app.use(cors());

//Passport.js
app.use(passport.initialize());
passport.use('jwt', passportStategies.jwt);

// Add the api router
app.use(client.static);
app.use(client.clientRouter);
app.use('/api', router);


app.use(errors.converter);
app.use(errors.notFound);
app.use(errorHandler);

module.exports = app;