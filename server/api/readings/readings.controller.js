'use strict';
/**
 *  @module Patch
 */
import * as common from '../../utils/common.js';
import * as strings from '../../utils/strings.js';
import jsonpatch from 'jsonpatch';
import logger from '../../utils/logger.js';

/**
 *  Applies patch object to the given object in request body.
 *	Sends patched object if given patch object is valid otherwise sends error message.
 *  @param {Object} req - Http request object
 *  @param {Object} res - Http response object
 */
export function applyPatch(req, res) {

	// Return error if the required keys are not in request
	if(common.checkRequiredKeys(req, ['docObj', 'patchObj'])){
		return common.sendResponse(res, 400, null, null, strings.error.MISSING_FIELDS);
	}

	let patchedDoc;
	try{
		// Will throw error if patchObj is not valid
		patchedDoc = jsonpatch.apply_patch(req.body.docObj, req.body.patchObj);
	} catch (err) {
		logger.error(err);
		return common.sendResponse(res, 400, null, null, strings.error.SOMETHING);
	}

	// Send patched document
	return common.sendResponse(res, 200, null, {
		patchedDoc
	});
}
