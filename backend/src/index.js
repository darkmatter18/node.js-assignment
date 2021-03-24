const vars = require('./config/vars');
const logger = require('./config/logger');
const app = require('./config/express');
const mongoose = require('./config/mongoose');

// open mongoose connection
mongoose.connect();

// listen to requests
app.listen(vars.port, () => logger.info(`server started on port ${vars.port} (${vars.env})`));

/**
* Exports express
* @public
*/
module.exports = app;