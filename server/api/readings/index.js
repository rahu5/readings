'use strict';

import { Router } from 'express';
import * as controller from './readings.controller.js';

let	router = new Router();

//	All routes of patch
router.post('/add', controller.addReading);
router.post('/get', controller.getAllByDate);
router.post('/agg', controller.getAggByDate);

module.exports = router;
