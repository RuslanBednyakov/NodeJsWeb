const express = require('express');
const router = express.Router();

import * as Controller from '../controller';


router.post('/sign-up', Controller.auth.signUp);

router.post('/sign-in', Controller.auth.signIn);

router.post('/logout', Controller.auth.logOut);


export { router as auth };