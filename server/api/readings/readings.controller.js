'use strict';
/**
 *  @module Patch
 */
import db from '../../models';
import logger from '../../utils/logger.js';
import * as common from '../../utils/common.js';
import * as strings from '../../utils/strings.js';

/**
 *  Applies patch object to the given object in request body.
 *	Sends patched object if given patch object is valid otherwise sends error message.
 *  @param {Object} req - Http request object
 *  @param {Object} res - Http response object
 */
export function addReading(req, res) {

	// Return error if the required keys are not in request
	if(common.checkRequiredKeys(req, ['reading', 'timestamp', 'sensorType'])){
		return common.sendResponse(res, 400, null, null, strings.error.MISSING_FIELDS);
	}
	let reading = req.body.reading;
	let timestamp = new Date(parseInt(req.body.timestamp));
	let sensorType = req.body.sensorType;

	db.readings.addOne(reading, timestamp, sensorType)
		.then(() => {
			return common.sendResponse(res, 200, strings.message.ADDED);
		})
		.catch((err) => {
			logger.error(err);
			return common.sendResponse(res, 500, null, null, strings.error.INTERNAL_ERROR);
		});
}

/**
 *  Applies patch object to the given object in request body.
 *	Sends patched object if given patch object is valid otherwise sends error message.
 *  @param {Object} req - Http request object
 *  @param {Object} res - Http response object
 */
export function getAllByDate(req, res) {

	// Return error if the required keys are not in request
	if(common.checkRequiredKeys(req, ['fromDate', 'toDate'])){
		return common.sendResponse(res, 400, null, null, strings.error.MISSING_FIELDS);
	}
	let dateRange = {
		from : new Date(parseInt(req.body.fromDate)),
		to : new Date(parseInt(req.body.toDate))
	};
	let sensorType = req.body.sensorType;

	logger.info(dateRange);
	db.readings.findBetween(dateRange, sensorType)
		.then(list => {
			return common.sendResponse(res, 200, null, list);
		})
		.catch((err) => {
			logger.error(err);
			return common.sendResponse(res, 500, null, null, strings.error.INTERNAL_ERROR);
		});
}

/**
 *  Applies patch object to the given object in request body.
 *	Sends patched object if given patch object is valid otherwise sends error message.
 *  @param {Object} req - Http request object
 *  @param {Object} res - Http response object
 */
export function getAggByDate(req, res) {

	// Return error if the required keys are not in request
	if(common.checkRequiredKeys(req, ['fromDate', 'toDate', 'agg'])){
		return common.sendResponse(res, 400, null, null, strings.error.MISSING_FIELDS);
	}

	let agg = req.body.agg.toLowerCase();

	if(!(agg === 'max' || agg === 'min' || 'mean' || 'avg')){
		return common.sendResponse(res, 400, null, null, strings.error.MISSING_FIELDS);
	}

	agg = agg === 'mean' ? 'avg' : agg;
	let dateRange = {
		from : new Date(parseInt(req.body.fromDate)),
		to : new Date(parseInt(req.body.toDate))
	};
	let sensorType = req.body.sensorType;

	db.readings.findAggBetween(agg, dateRange, sensorType)
		.then(agg => {
			return common.sendResponse(res, 200, null, agg);
		})
		.catch((err) => {
			logger.error(err);
			return common.sendResponse(res, 500, null, null, strings.error.INTERNAL_ERROR);
		});
}
