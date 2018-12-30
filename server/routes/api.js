const express = require('express');
const router = express.Router();

import { auth } from './auth';
import { search } from './search';
import { posts } from './posts';


router.use('/auth', auth);
router.use('/search', search)
router.use('/posts', posts)



export { router as api };