const express = require('express');
const router = express.Router();

import { staticPages } from './staticPages';
import { auth } from './auth';
import { users } from './users';

router.use('/', staticPages);
router.use('/auth', auth);

export default router