'use strict';
/**
 *	@module Config
 */

// All the configuration used in the app.

// Set node environment to development if not provided.
// process.env.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
process.env.NODE_ENV = 'development';

let config = {
	'ENV' : process.env.NODE_ENV,
	// Change host logic to take different host in case of production
	'HOST' : 'localhost',
	'PORT' : 4000,
	'PROTOCOL' : 'http',
	'SEED' : false
};

config.SERVER = config.PROTOCOL + '://' + config.HOST + ':' + config.PORT;

module.exports = config;
