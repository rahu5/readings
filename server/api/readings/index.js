'use strict';

import { Router } from 'express';
import { authenticate } from '../../auth/auth.service.js';
import * as controller from './patch.controller.js';

let	router = new Router();
//	All routes of patch
router.patch('/apply', authenticate(), controller.applyPatch);

module.exports = router;
