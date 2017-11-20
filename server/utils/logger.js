'use strict';
/**
 *	@module Utils
 */

import winston from 'winston';
import fs from 'fs';

// Date format for logs
const tsFormat = () => (new Date()).toLocaleTimeString();

//	In production : nothing on terminal, only on log files
let transports = [];

/**
 *	Only errors should be written to log file in production, nothing to console
 *	In development model debug, info, error will be logged to console...
 *	Levels verbose < debug < info < error ...
 */
transports.push(
	new (winston.transports.Console)({
		timestamp: tsFormat,
		colorize: true,
		level : 'debug'
	})
);

const logger = new (winston.Logger)({
	transports: transports
});

// Expose logger instance
export default logger;
