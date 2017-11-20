'use strict';
/**
 *  @module Readings
 *  @copyright Rahul Yadav
 */

import express from 'express';
import config from './config';
import path from 'path';
import http from 'http';
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
 */
function startServer() {
	app.serverInstance = server.listen(config.PORT, config.HOST, function() {
		logger.info('Express server listening on %d, in %s mode...', config.PORT, config.ENV);
	});
}

setImmediate(startServer);

// Expose app
exports = module.exports = app;
