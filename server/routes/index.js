'use strict';
/**
 * @module Routes
 */
import bodyParser from 'body-parser';
import * as strings from '../utils/strings.js';
import * as common from '../utils/common.js';

export default function(app) {
	app.use(bodyParser.json());

	app.use('/api/readings', require('../api/readings'));

	// All other routes should redirect to the index.html or to 404 Page
	app.route('/*')
		.get((req, res) => {
			return common.sendResponse(res, 404, null, null, strings.error.PAGE404);
		});
}
