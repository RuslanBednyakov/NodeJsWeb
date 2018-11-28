const express = require('express');
const router = express.Router();

import * as Controller from '../controller';


router.post('/sign-up', Controller.auth.signUp);

router.post('/login', Controller.auth.signIn);


export { router as auth };