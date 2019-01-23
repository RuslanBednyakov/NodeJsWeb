const express = require('express');
const router = express.Router();

import { auth } from './auth';
import { search } from './search';
import { posts } from './posts';
import { friends } from './friends';
import { followers } from './followers';


router.use('/auth', auth);
router.use('/search', search);
router.use('/posts', posts);
router.use('/friends', friends);
router.use('/followers', followers);



export { router as api };