'use strict';

import app from './';
import db from './server/models';
import config from './server/config';
import logger from './server/utils/logger.js';

before(function(done) {
	let force = {
		force : false
	};
	if(config.ENV === 'production'){
		force.force = false;
	}else{
		force.force = true;
	}
	logger.info('Test suite started ...');

	db.sequelize.sync(force)
		.then(() => {
			done();
		});
});

after(function(done) {
	logger.info('Test suite done ...');
	done();
});
