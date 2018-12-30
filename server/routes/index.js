const express = require('express');
const router = express.Router();

import { staticPages } from './staticPages';
import { api } from './api';

router.use('/', staticPages);
router.use('/api/v1', api);


export default router