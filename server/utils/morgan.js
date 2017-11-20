'use strict';
/**
 *	@module Utils
 */
var morgan = require('morgan');

/**
 *	Applies morgan api request logger middleware to the app. Recommended to use in development mode only.
 *	@param {Object} - app
 */
export default function(app) {
	// Inclose this to if(development) block in case to avoid this in production
	app.use(morgan('dev'));
}
