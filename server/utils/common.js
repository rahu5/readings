'use strict';
/**
 *  @module Utils
 */

/**
 *  Send response with given status code and payload.
 *  @return false.
 */
export function sendResponse(res, code, message, data, error) {
	res.status(code).json({
		message,
		error,
		data
	});
	return false;
}

/**
 *  Checks specified keys in the request body object. Returns true if any required key is null or undefined.
 *  @return Boolean.
 */
export function checkRequiredKeys(req, keyArr){
	for(let i=0; i<keyArr.length; i++){
		if(req.body[keyArr[i]] == undefined || req.body[keyArr[i]] == null){
			return true;
		}
	}
	return false;
}
