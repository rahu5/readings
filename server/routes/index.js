'use strict';
/**
 * @module Routes
 */
import bodyParser from 'body-parser';

export default function(app) {
	app.use(bodyParser.json());

	app.use('/api/readings', require('../auth').default);

	// All other routes should redirect to the index.html or to 404 Page
	app.route('/*')
		.get((req, res) => {
			res.sendFile(path.resolve(__dirname + "/../../public/index.html"));
		});
}
