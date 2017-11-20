'use strict';
/**
 *  @module Readings
 *  @copyright Rahul Yadav
 */

import path from 'path';
import http from 'http';
import db from './models';
import express from 'express';
import config from './config';
import logger from './utils/logger.js';

// Setup server
var app = express();
var server = http.createServer(app);

//  Logging middleware
require('./utils/morgan.js').default(app);

// Bootsrap routes
require('./routes').default(app);

//	Expose public directory
app.use(express.static(path.join(__dirname, '../public')));

/**
 *	Starts the express server, listen on the port provided in the config file.
 *	Call this when database syn is done.
 */
function startServer() {
	app.serverInstance = server.listen(config.PORT, config.HOST, function() {
		logger.info('Express server listening on %d, in %s mode...', config.PORT, config.ENV);
	});
}


db.sequelize.sync()
	.then(startServer)
	.catch(function(err) {
		logger.error('Server failed to start due to error: %s', err);
	});

// Expose app
exports = module.exports = app;
