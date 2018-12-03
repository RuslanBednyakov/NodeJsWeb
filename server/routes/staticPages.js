const express = require('express');
const router = express.Router();


router.use('/auth', express.static('public/auth'))
router.use('/signUp', express.static('public/sign-up'))
router.use('/home', express.static('public/home'))

export { router as staticPages };