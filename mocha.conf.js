'use strict';

import app from './';
import db from './server/models';
import config from './server/config';
import logger from './server/utils/logger.js';

before(function(done) {
	logger.info('Test suite started ...');

	db.sequelize.sync({force:true})
		.then(() => {
			done();
		});
});

after(function(done) {
	logger.info('Test suite done ...');
	done();
});
